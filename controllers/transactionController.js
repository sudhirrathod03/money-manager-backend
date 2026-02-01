const Transaction = require("../models/Transaction");
const moment = require("moment");

exports.getAllTransactions = async (req, res) => {
  try {
    const { frequency, selectedDate, type, division, category, account } =
      req.body; // added account filter

    const query = { userid: req.body.userid };

    if (frequency !== "custom") {
      query.date = { $gt: moment().subtract(Number(frequency), "d").toDate() };
    } else if (selectedDate.length > 0) {
      query.date = { $gte: selectedDate[0], $lte: selectedDate[1] };
    }

    if (type !== "all") query.type = type;
    if (division && division !== "all") query.division = division;
    if (category && category !== "all") query.category = category;
    if (account && account !== "all") query.account = account; // new filter

    const transactions = await Transaction.find(query).sort({ date: -1 });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.addTransaction = async (req, res) => {
  try {
    const newTransaction = new Transaction(req.body);
    await newTransaction.save();
    res.status(201).send("Transaction Created");
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.addTransfer = async (req, res) => {
  try {
    const {
      fromAccount,
      toAccount,
      amount,
      date,
      description,
      division,
      userid,
    } = req.body;

    // 1. Debit from Source Account
    const debitTxn = new Transaction({
      userid,
      type: "expense",
      account: fromAccount,
      category: "Transfer",
      amount,
      date,
      description: `Transfer to ${toAccount}`,
      division,
    });
    await debitTxn.save();

    // 2. Credit to Destination Account
    const creditTxn = new Transaction({
      userid,
      type: "income",
      account: toAccount,
      category: "Transfer",
      amount,
      date,
      description: `Transfer from ${fromAccount}`,
      division,
    });
    await creditTxn.save();

    res.status(201).send("Transfer Successful");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.editTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.body.transactionId);
    const createdTime = moment(transaction.createdAt);
    const currentTime = moment();
    const hours = moment.duration(currentTime.diff(createdTime)).asHours();

    if (hours > 12)
      return res.status(400).send("Cannot edit transaction after 12 hours");

    await Transaction.findOneAndUpdate(
      { _id: req.body.transactionId },
      req.body.payload
    );
    res.status(200).send("Edit Successful");
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.deleteTransaction = async (req, res) => {
  try {
    await Transaction.findOneAndDelete({ _id: req.body.transactionId });
    res.status(200).send("Transaction Deleted Successfully");
  } catch (error) {
    res.status(500).json(error);
  }
};
