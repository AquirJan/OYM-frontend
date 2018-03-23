const regIE = /MSIE/gi;

export const detectBrowser = () => {
  // console.log(window.navigator.userAgent)
  let tmp_ua = window.navigator.userAgent;
  if(tmp_ua.match(regIE)){
    return 'lowerIE'
  }else{
    return 'modern' 
  }
}

export const isEmptyObject = (_obj)=>{
  if(typeof(_obj) == 'object'){
    if(JSON.stringify(_obj)=='{}'){
      return true;
    }
  }
  return false;
}

export const projectNameReg = /^\w+$/gi;