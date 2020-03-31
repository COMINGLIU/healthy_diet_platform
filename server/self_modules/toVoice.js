const toVoice = (tencentcloud,config) => {
  const AaiClient = tencentcloud.aai.v20180522.Client;
  const models = tencentcloud.aai.v20180522.Models;
  
  const Credential = tencentcloud.common.Credential;
  const ClientProfile = tencentcloud.common.ClientProfile;
  const HttpProfile = tencentcloud.common.HttpProfile;
  
  let cred = new Credential("AKIDJOHrCKr6fz73pRv79wUowtdIl25tar7A", "5wb1FF3Zs2xhCRTL5aw2we9PTP9WjrkS");
  let httpProfile = new HttpProfile();
  httpProfile.endpoint = "aai.tencentcloudapi.com";
  let clientProfile = new ClientProfile();
  clientProfile.httpProfile = httpProfile;
  let client = new AaiClient(cred, "ap-guangzhou", clientProfile);
  
  let toVoiceReq = new models.TextToVoiceRequest();
  
  let params = '{"Text":"这是一首简单的小情歌","SessionId":"sdcsc111","ModelType":1}'
  let params = JSON.stringify({
    Text: config.text,
    
  })
  toVoiceReq.from_json_string(params);
  client.TextToVoice(toVoiceReq, function(errMsg, response) {
      if (errMsg) {
        config.fail&&config.fail(errMsg);
      }
      let res = JSON.parse(response.to_json_string()).Audio;
      config.success&&config.success(res);
  });
}

