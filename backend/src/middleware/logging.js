const logginMdw = (req,res,next)=>{
  console.log(`Se hizo un request a la URL ${req.url}`);
  res.setHeader("Content-Type", "Application/json");
  next();
}

module.exports = logginMdw