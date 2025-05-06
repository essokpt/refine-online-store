"use client";

import dataProviderNestjsxCrud from "@refinedev/nestjsx-crud";

const API_URL = "http://127.0.0.1:3001";

export const dataProvider = dataProviderNestjsxCrud(API_URL);
