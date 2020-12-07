# -*- coding: utf-8 -*-
"""
Created on Sun Dec  6 16:05:55 2020

@author: akhilg
"""


import pandas as pd
import numpy as np

PATH = "C:\\Users\\akhilg\\Documents\\CollegeDocuments\\BDMA\\CentralSuperlec\\Coursework\\\VA\Project\\"

PATH2 = "p5\prototype-1\data\\"


main_df = pd.read_csv(PATH + PATH2 + "annual-number-of-deaths-by-cause.csv", header=0)
print(f"The the length  of the main df before removing country with empty codes is ={len(main_df)}")
main_df.dropna(subset=['Code'], inplace=True)
print(f"The the length  of the main df after removing country with empty codes is ={len(main_df)}")


codes = pd.read_csv(PATH + "data\\world_country_and_usa_states_latitude_and_longitude_values.csv", header=0)
# print(codes.head())


def compare():
    main_df['int_code'] = main_df.apply(check, axis=1)
    print(main_df['int_code'])

    print("Compare successfull.")
    new_df = main_df.groupby("int_code").filter(lambda x: len(x) >=28)
    new_df.to_csv(PATH + PATH2 + "new_main_df.csv")

def check(row):

    code = codes.iloc[np.where(codes['country'] == row['Entity'])]
    # import pdb;pdb.set_trace()
    try:

        new_code = code['country_code'].to_list()[0]

    except Exception as e:
        print("\n\n** Occured for code = ", row.Entity)
        assert False
    return new_code

if __name__ == '__main__':
    compare()


