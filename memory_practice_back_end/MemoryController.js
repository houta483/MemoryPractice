const db = require('./MemoryModel')

module.exports = {
  postRecord(req, res, next) {
    const { numberOfDigits, incorrectDigits, mistakenStringOfNums } = req.body;
    console.log(numberOfDigits, incorrectDigits, mistakenStringOfNums)
    const sql = `INSERT INTO memoryTable (numberOfDigits, incorrectDigits, mistakenStringOfNums) VALUES(${numberOfDigits},"${incorrectDigits}",${mistakenStringOfNums})`;

    db.query(sql, (error, result) => {
      if (error) throw error;

      res.locals.result = result;
      return next();
    })
  },

  getRecords(req, res, next) {
    const sql = 'SELECT * FROM memoryTable'

    db.query(sql, (error, result) => {
      if (error) throw error;

      res.locals.result = result;
      return next();
    })
  }
  // Add average digit memory length????
}