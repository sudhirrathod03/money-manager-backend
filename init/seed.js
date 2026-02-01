const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const Transaction = require("../models/Transaction");

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const sampleData = [

  {
    userid: "test_user",
    amount: 85000,
    type: "income",
    category: "Salary",
    division: "Personal",
    account: "Bank",
    description: "February Salary Credited",
    date: new Date() 
  },
  {
    userid: "test_user",
    amount: 450,
    type: "expense",
    category: "Food",
    division: "Personal",
    account: "UPI",
    description: "Lunch at Cafe",
    date: new Date() 
  },
  {
    userid: "test_user",
    amount: 2500,
    type: "expense",
    category: "Fuel",
    division: "Office",
    account: "Credit Card",
    description: "Car Fuel for Client Visit",
    date: new Date(new Date().setDate(new Date().getDate() - 1)) 
  },
  {
    userid: "test_user",
    amount: 12000,
    type: "income",
    category: "Other",
    division: "Office",
    account: "Bank",
    description: "Freelance Project Advance",
    date: new Date(new Date().setDate(new Date().getDate() - 1)) 
  },

  {
    userid: "test_user",
    amount: 1200,
    type: "expense",
    category: "Food",
    division: "Personal",
    account: "Cash",
    description: "Grocery Shopping",
    date: new Date(new Date().setDate(new Date().getDate() - 3)) 
  },
  {
    userid: "test_user",
    amount: 800,
    type: "expense",
    category: "Movie",
    division: "Personal",
    account: "UPI",
    description: "Cinema Tickets",
    date: new Date(new Date().setDate(new Date().getDate() - 4)) 
  },
  {
    userid: "test_user",
    amount: 5000,
    type: "expense",
    category: "Medical",
    division: "Personal",
    account: "Bank",
    description: "Health Insurance Premium",
    date: new Date(new Date().setDate(new Date().getDate() - 5)) 
  },
  {
    userid: "test_user",
    amount: 300,
    type: "expense",
    category: "Other",
    division: "Office",
    account: "Cash",
    description: "Office Stationery",
    date: new Date(new Date().setDate(new Date().getDate() - 6)) 
  },

  {
    userid: "test_user",
    amount: 15000,
    type: "income",
    category: "Loan",
    division: "Personal",
    account: "Bank",
    description: "Friend Returned Money",
    date: new Date(new Date().setDate(new Date().getDate() - 10)) 
  },
  {
    userid: "test_user",
    amount: 2200,
    type: "expense",
    category: "Food",
    division: "Personal",
    account: "Credit Card",
    description: "Dinner Party",
    date: new Date(new Date().setDate(new Date().getDate() - 12)) 
  },
  {
    userid: "test_user",
    amount: 4500,
    type: "expense",
    category: "Fuel",
    division: "Office",
    account: "UPI",
    description: "Monthly Travel Allowance",
    date: new Date(new Date().setDate(new Date().getDate() - 15)) 
  },
  {
    userid: "test_user",
    amount: 6000,
    type: "income",
    category: "Salary",
    division: "Office",
    account: "Bank",
    description: "Performance Bonus",
    date: new Date(new Date().setDate(new Date().getDate() - 20)) 
  },
  {
    userid: "test_user",
    amount: 900,
    type: "expense",
    category: "Movie",
    division: "Personal",
    account: "Cash",
    description: "Netflix Subscription",
    date: new Date(new Date().setDate(new Date().getDate() - 25)) 
  },
  {
    userid: "test_user",
    amount: 18000,
    type: "expense",
    category: "Loan",
    division: "Personal",
    account: "Bank",
    description: "Home Loan EMI",
    date: new Date(new Date().setDate(new Date().getDate() - 28)) 
  },

  {
    userid: "test_user",
    amount: 75000,
    type: "income",
    category: "Salary",
    division: "Personal",
    account: "Bank",
    description: "Previous Month Salary",
    date: new Date(new Date().setMonth(new Date().getMonth() - 2)) 
  },
  {
    userid: "test_user",
    amount: 5000,
    type: "expense",
    category: "Medical",
    division: "Personal",
    account: "Cash",
    description: "Dental Treatment",
    date: new Date(new Date().setMonth(new Date().getMonth() - 3)) 
  },
  {
    userid: "test_user",
    amount: 1200,
    type: "expense",
    category: "Other",
    division: "Office",
    account: "UPI",
    description: "Team Outing",
    date: new Date(new Date().setMonth(new Date().getMonth() - 4)) 
  },
  {
    userid: "test_user",
    amount: 3500,
    type: "expense",
    category: "Fuel",
    division: "Personal",
    account: "Credit Card",
    description: "Long Drive Fuel",
    date: new Date(new Date().setMonth(new Date().getMonth() - 5)) 
  },
  {
    userid: "test_user",
    amount: 40000,
    type: "income",
    category: "Other",
    division: "Personal",
    account: "Bank",
    description: "Stock Market Profit",
    date: new Date(new Date().setMonth(new Date().getMonth() - 6)) 
  },
  {
    userid: "test_user",
    amount: 250,
    type: "expense",
    category: "Food",
    division: "Personal",
    account: "Cash",
    description: "Street Food",
    date: new Date(new Date().setMonth(new Date().getMonth() - 8)) 
  }
];

const seedDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
        throw new Error("MONGO_URI is undefined. Check your .env path!");
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DB...");
    

    await Transaction.deleteMany({});
    console.log("Data cleared.");


    await Transaction.insertMany(sampleData);
    console.log("20 Sample records inserted successfully!");
    
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedDB();