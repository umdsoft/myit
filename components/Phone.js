

exports.getPhone = (phone)=>{
    let phone_new = "";
    if(phone.length < 9 ){
        return false;
    }

    for (let i=0; i<phone.length;  i++){
        if('0'<=phone[i] && phone[i] <= '9'){
            phone_new += phone[i];
        }
    }
    if(phone_new.length > 9){
        if(phone_new[2] == '8' && phone_new[1] == '9' && phone_new[0] == '9'){
            phone_new = phone_new.substr(3,phone_new.length);
        }else{
            return false;
        }
    }
    return phone_new;
}
