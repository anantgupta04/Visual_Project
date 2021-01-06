#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sat Jan  2 20:11:08 2021

@author: Javi
"""
import pandas as pd

data = pd.read_csv('new_main_df.csv')
annual = pd.read_csv('annual-number-of-deaths-by-cause.csv')

years = [1990,1991,1992,1993,1994,1995,1996,1997,1998,1999,2000,2001,2002,
        2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,
        2016,2017]

deaths = ['cardiovascular','alzheimer','drugs','nutritional','fights']

for x in deaths:
    for y in years:
        print(x, y, round(data.loc[data['Year']==y, x].sum()))