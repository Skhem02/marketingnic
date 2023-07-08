from flask import Flask, render_template, request, jsonify
import pandas as pd
from statsmodels.tsa.statespace.sarimax import SARIMAX
import warnings

app = Flask(__name__)

# Load the dataset
data = pd.read_csv('nic_dataset0.csv')

# Perform SARIMA modeling and prediction
def perform_sarima_prediction(commodity_name):
    commodity_data = data[data['CommodityName'].str.lower() == commodity_name.lower()]
    if len(commodity_data) > 0:
        with warnings.catch_warnings():
            warnings.filterwarnings("ignore")

            model = SARIMAX(commodity_data['ModalPrice'], order=(1, 1, 1), seasonal_order=(1, 0, 0, 12))
            model_fit = model.fit(disp=False)

            # Forecast the prices for the next year
            next_year_forecast = model_fit.get_forecast(steps=12)
            forecasted_prices = next_year_forecast.predicted_mean
            next_year_price = forecasted_prices.iloc[-1]

        return next_year_price
    else:
        return None

# Flask routes
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get_option_details')
def get_option_details():
    vegetable = request.args.get('vegetable')
    option = request.args.get('option')

    vegetable_data = data[data['CommodityName'].str.lower() == vegetable.lower()]
    if not vegetable_data.empty:
        if option == 'Price':
            return jsonify({option: '₹ {:.2f} per Quintals'.format(vegetable_data['ModalPrice'].mean())})
        elif option == 'Market':
            markets = vegetable_data['MarketName'].unique()
            return jsonify({option: list(markets)})
        elif option == 'Season':
            if 'Season' in vegetable_data:
                return jsonify({option: vegetable_data['Season'].iloc[-1]})
            else:
                return jsonify({option: 'N/A'})
        elif option == 'GrowingSeason':
            if 'GrowingSeason' in vegetable_data:
                return jsonify({option: vegetable_data['GrowingSeason'].iloc[-1]})
            else:
                return jsonify({option: 'N/A'})
        elif option == 'NextYearPrice':
            next_year_price = perform_sarima_prediction(vegetable)
            if next_year_price is not None:
                return jsonify({option: '₹ {:.2f} per Quintals'.format(next_year_price)})
            else:
                return jsonify({option: 'N/A'})

    return jsonify({option: 'N/A'})

if __name__ == '__main__':
    app.run(debug=True)
