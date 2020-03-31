module.exports = async (CONN,sql) =>{
  CONN.query(sql,(err,data) => {
    if(err){
      return err;
    }else {
      // console.log('函数查询结果',data);
      return data;
    }
  })
}