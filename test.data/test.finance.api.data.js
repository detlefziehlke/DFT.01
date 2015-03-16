"use strict";

exports.getBalance_testResponse = [
  {"konto": "AXA", "saldo": 50.82},
  {"konto": "Anlagen", "saldo": 42985.51},
  {"konto": "Girokonto", "saldo": 12978.57},
  {"konto": "Kasse", "saldo": 186.77},
  {"konto": "Kasse1", "saldo": 6},
  {"konto": "Mutti", "saldo": -3},
  {"konto": "Tagegeld", "saldo": 91142.48},
  {"konto": "VISA", "saldo": -12.9}
];

exports.getEntriesByAccount = {
  ATUAccId: 2, ATUEntryCount: 5,
  KasseAccName: 'Kasse', KasseEntryCount: 520
};

exports.getAllEntries = {
  NumberOfEntries: 873
};