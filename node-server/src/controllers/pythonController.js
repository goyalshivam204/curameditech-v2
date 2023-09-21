const { config } = require( "../axios");
const axios = require('axios');


exports.predictDisease = async (req,res)=>{
    // console.log(req.body);

    // alert(inputs);
    try {
        const resData = await axios.post("http://python-server:3001/api/predict", req.body);
        // const resData = await axios.post("http://python-server:3001/api/predict", req.body, config);
        res.status(200).json(resData.data);
        // console.log(resData);
    } catch (err) {
        res.status(500).json(err);
        // console.log(err);
    }
   
}

exports.predictDiabetes = async (req,res) => {
    try {
        const resData = await axios.post("http://python-server:3001/api/diabetes", req.body);
        // const resData = await axios.post("http://python-server:3001/api/diabetes", req.body, config);
        res.status(200).json(resData.data);
        // console.log(resData);
    } catch (err) {
        res.status(500).json(err);
        // console.log(err);
    }
}

exports.predictHeart = async (req,res) => {
    try {
        const resData = await axios.post("http://python-server:3001/api/heart", req.body);
        // const resData = await axios.post("http://python-server:3001/api/heart", req.body, config);
        res.status(200).json(resData.data);
        // console.log(resData);
    } catch (err) {
        res.status(500).json(err);
        // console.log(err);
    }
}

