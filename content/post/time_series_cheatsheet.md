---
title: Time Series Cheatsheet
author: "Rui"
categories:
- Machine Learning
- Time Series
- Cheatsheet
date: 2022-02-19
---



This article aims to provide some pre-fabricated functions for time series analysis. After a dedication in Time Series field for past few months,  I found it is good for getting some structual knowledge recorded.



Through extensive projects and refinement, I have crafted a collection of functions that aim to streamline the process of analyzing temporal patterns, identifying trends, and extracting meaningful insights from time series datasets. 



In real work, I use these function to deliver fast results, although the basic notion can be easily forget sometimes : )



Basic required libraries:

```python
# For data manipulation
import numpy as np
import pandas as pd

# To fetch financial data
import yfinance as yf

# For visualisation
import matplotlib.pyplot as plt
```



Plotting Moving Avg.

```python
def plotMovingAvg(series, window, scale = 1.96, plot_intervals =False, anomalies = False):
    """
        series - time indexed dataframe 
        window - rolling window size (days)

    """
    # by_day_stage = series
    # by_day_stage['timestamp'] = series.index
    # by_day_stage['date'] = series.apply(lambda x:str(x['timestamp']).split()[0], axis=1)
    # by_day = by_day_stage.groupby(by='date').agg({'open': 'mean'})
    rolling_mean = series.rolling(window=window).mean()
    
    fig, ax = plt.subplots(figsize=(16,9))
    ax.plot(series[window:], label="Actual values")
    ax.plot(rolling_mean, label = 'MA')
    ax.set_title("Moving average\n window size = {}".format(window))
    

    # plot intervals
    if plot_intervals:
        mae = mean_absolute_error(series[window:], rolling_mean[window:])
        deviation = np.std(series[window:] - rolling_mean[window:])
        lower_bond = rolling_mean - (mae + scale * deviation)
        upper_bond = rolling_mean + (mae + scale * deviation)
        plt.plot(upper_bond, "r--", label="Upper Bond / Lower Bond")
        plt.plot(lower_bond, "r--")

        # plot abnormals
        # Having the intervals, find abnormal values
        if anomalies:
            anomalies = pd.DataFrame(index=series.index, columns=series.columns)
            anomalies[series<lower_bond] = series[series<lower_bond]
            anomalies[series>upper_bond] = series[series>upper_bond]
            plt.plot(anomalies, "ro", markersize=10)
```



Example Plotting

```python
plotMovingAvg(test_df, 480, plot_intervals =True, anomalies = True)
```



Export Results

![img](https://www.kaggleusercontent.com/kf/50985180/eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..zWIu3Foz2bx7F5TZJvnBOw.KicB2tc55Yyj2ENgh8_xyBQu5e1NyyKNWFXFotqQi0s_imP2w3_fBkUy1EAV-Vzew329veiUgDPf2Aa30zp2eR_0Kphh48zLCybbHaxvNcYPqWGi4AIaXqjzUVL2qkm5NahS9wsPN83tWU_M0UphVCe_1rI4vGi__6_C_9jOaH94nKz5U0d9R95NPT-n6qu3e6P_7wAIgClnXJeoikfQInJaa8QkLnTIWNhspOW9FHTZSYYA0Sv1jAlNAohRlDIGNVoxrAvZSGorCYcB6loKjAwCSCf4mOF_dHK_zYw4wCFGJcSQJTlO6hnAz3Ys32gIoj01GPJ4wYEMHJ_Ymq3GGK94Mpj5lFD_MY4SqKb5YLBwHhVNW-Eag5dmE6MAVjOpw4w8lvIUe8tvKcAZog7r3Yz6c9ICFTWBqup2KYL8qOw1dlt4x8LaL0qzCQqoR1vgF0_L3rLixAW4QEOCDJ9qW7uF74eQ8ACGUUVle8ckXTsOk8F0vscNUoaSGJOolUj66y3xLo-IzV-uh-hNtILV4PxW-Dcp667OJtXEGFhabVmRfebE4L8-XIkL319hWpy1h7VDfzv0mg7k0WNLjZNXVloNmWsdGLAx06JqeFBj4p1cEDO7yRptfeNQUt_IVErbY9VvjH68AkfR185PpcFQDBZMsL1e1soFu1jl8O9O1ayGVnW1KrjYSCUzwauH54X0.kV9fJzFZfF6k_gHJ0usF6A/__results___files/__results___35_0.png)

```python
def plotModelResults(model, X_train=X_train, X_test=X_test, plot_intervals=False, plot_anomalies=False):
    """
        Plots modelled vs fact values, prediction intervals and anomalies
    
    """
    
    prediction = model.predict(X_test
    plt.figure(figsize=(15, 7))
        plt.plot(prediction, "g", label="prediction", linewidth=2.0)
        plt.plot(y_test.values, label="actual", linewidth=2.0)

        if plot_intervals:
            cv = cross_val_score(model, X_train, y_train, 
                                        cv=tscv, 
                                        scoring="neg_mean_absolute_error")
            mae = cv.mean() * (-1)
            deviation = cv.std()

            scale = 1.96
            lower = prediction - (mae + scale * deviation)
            upper = prediction + (mae + scale * deviation)

            plt.plot(lower, "r--", label="upper bond / lower bond", alpha=0.5)
            plt.plot(upper, "r--", alpha=0.5)

            if plot_anomalies:
                anomalies = np.array([np.NaN]*len(y_test))
                anomalies[y_test<lower] = y_test[y_test<lower]
                anomalies[y_test>upper] = y_test[y_test>upper]
                plt.plot(anomalies, "o", markersize=10, label = "Anomalies")

        error = mean_absolute_percentage_error(prediction, y_test)
        plt.title("Mean absolute percentage error {0:.2f}%".format(error))
        plt.legend(loc="best")
        plt.tight_layout()
        plt.grid(True);
```



![img](https://www.kaggleusercontent.com/kf/50985180/eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..zWIu3Foz2bx7F5TZJvnBOw.KicB2tc55Yyj2ENgh8_xyBQu5e1NyyKNWFXFotqQi0s_imP2w3_fBkUy1EAV-Vzew329veiUgDPf2Aa30zp2eR_0Kphh48zLCybbHaxvNcYPqWGi4AIaXqjzUVL2qkm5NahS9wsPN83tWU_M0UphVCe_1rI4vGi__6_C_9jOaH94nKz5U0d9R95NPT-n6qu3e6P_7wAIgClnXJeoikfQInJaa8QkLnTIWNhspOW9FHTZSYYA0Sv1jAlNAohRlDIGNVoxrAvZSGorCYcB6loKjAwCSCf4mOF_dHK_zYw4wCFGJcSQJTlO6hnAz3Ys32gIoj01GPJ4wYEMHJ_Ymq3GGK94Mpj5lFD_MY4SqKb5YLBwHhVNW-Eag5dmE6MAVjOpw4w8lvIUe8tvKcAZog7r3Yz6c9ICFTWBqup2KYL8qOw1dlt4x8LaL0qzCQqoR1vgF0_L3rLixAW4QEOCDJ9qW7uF74eQ8ACGUUVle8ckXTsOk8F0vscNUoaSGJOolUj66y3xLo-IzV-uh-hNtILV4PxW-Dcp667OJtXEGFhabVmRfebE4L8-XIkL319hWpy1h7VDfzv0mg7k0WNLjZNXVloNmWsdGLAx06JqeFBj4p1cEDO7yRptfeNQUt_IVErbY9VvjH68AkfR185PpcFQDBZMsL1e1soFu1jl8O9O1ayGVnW1KrjYSCUzwauH54X0.kV9fJzFZfF6k_gHJ0usF6A/__results___files/__results___118_0.png)



```python
def plotCoefficients(model):
    """
        Plots sorted coefficient values of the model
    """
    
    coefs = pd.DataFrame(model.coef_, X_train.columns)
    coefs.columns = ["coef"]
    coefs["abs"] = coefs.coef.apply(np.abs)
    coefs = coefs.sort_values(by="abs", ascending=False).drop(["abs"], axis=1)
    
    plt.figure(figsize=(15, 7))
    coefs.coef.plot(kind='bar')
    plt.grid(True, axis='y')
    plt.hlines(y=0, xmin=0, xmax=len(coefs), linestyles='dashed');

```



![img](https://www.kaggleusercontent.com/kf/50985180/eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..zWIu3Foz2bx7F5TZJvnBOw.KicB2tc55Yyj2ENgh8_xyBQu5e1NyyKNWFXFotqQi0s_imP2w3_fBkUy1EAV-Vzew329veiUgDPf2Aa30zp2eR_0Kphh48zLCybbHaxvNcYPqWGi4AIaXqjzUVL2qkm5NahS9wsPN83tWU_M0UphVCe_1rI4vGi__6_C_9jOaH94nKz5U0d9R95NPT-n6qu3e6P_7wAIgClnXJeoikfQInJaa8QkLnTIWNhspOW9FHTZSYYA0Sv1jAlNAohRlDIGNVoxrAvZSGorCYcB6loKjAwCSCf4mOF_dHK_zYw4wCFGJcSQJTlO6hnAz3Ys32gIoj01GPJ4wYEMHJ_Ymq3GGK94Mpj5lFD_MY4SqKb5YLBwHhVNW-Eag5dmE6MAVjOpw4w8lvIUe8tvKcAZog7r3Yz6c9ICFTWBqup2KYL8qOw1dlt4x8LaL0qzCQqoR1vgF0_L3rLixAW4QEOCDJ9qW7uF74eQ8ACGUUVle8ckXTsOk8F0vscNUoaSGJOolUj66y3xLo-IzV-uh-hNtILV4PxW-Dcp667OJtXEGFhabVmRfebE4L8-XIkL319hWpy1h7VDfzv0mg7k0WNLjZNXVloNmWsdGLAx06JqeFBj4p1cEDO7yRptfeNQUt_IVErbY9VvjH68AkfR185PpcFQDBZMsL1e1soFu1jl8O9O1ayGVnW1KrjYSCUzwauH54X0.kV9fJzFZfF6k_gHJ0usF6A/__results___files/__results___118_1.png)





XGBoot Codes:

```python
from xgboost import XGBRegressor 

xgb = XGBRegressor()
xgb.fit(X_train_scaled, y_train)

plotModelResults(xgb, 
                 X_train=X_train_scaled, 
                 X_test=X_test_scaled, 
                 plot_intervals=True, plot_anomalies=True)
```



![img](https://www.kaggleusercontent.com/kf/50985180/eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..zWIu3Foz2bx7F5TZJvnBOw.KicB2tc55Yyj2ENgh8_xyBQu5e1NyyKNWFXFotqQi0s_imP2w3_fBkUy1EAV-Vzew329veiUgDPf2Aa30zp2eR_0Kphh48zLCybbHaxvNcYPqWGi4AIaXqjzUVL2qkm5NahS9wsPN83tWU_M0UphVCe_1rI4vGi__6_C_9jOaH94nKz5U0d9R95NPT-n6qu3e6P_7wAIgClnXJeoikfQInJaa8QkLnTIWNhspOW9FHTZSYYA0Sv1jAlNAohRlDIGNVoxrAvZSGorCYcB6loKjAwCSCf4mOF_dHK_zYw4wCFGJcSQJTlO6hnAz3Ys32gIoj01GPJ4wYEMHJ_Ymq3GGK94Mpj5lFD_MY4SqKb5YLBwHhVNW-Eag5dmE6MAVjOpw4w8lvIUe8tvKcAZog7r3Yz6c9ICFTWBqup2KYL8qOw1dlt4x8LaL0qzCQqoR1vgF0_L3rLixAW4QEOCDJ9qW7uF74eQ8ACGUUVle8ckXTsOk8F0vscNUoaSGJOolUj66y3xLo-IzV-uh-hNtILV4PxW-Dcp667OJtXEGFhabVmRfebE4L8-XIkL319hWpy1h7VDfzv0mg7k0WNLjZNXVloNmWsdGLAx06JqeFBj4p1cEDO7yRptfeNQUt_IVErbY9VvjH68AkfR185PpcFQDBZMsL1e1soFu1jl8O9O1ayGVnW1KrjYSCUzwauH54X0.kV9fJzFZfF6k_gHJ0usF6A/__results___files/__results___146_0.png)
