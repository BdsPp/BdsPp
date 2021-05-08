(function() {
    module.exports = {
        NumtoBuf : function(num){
            if(typeof num === 'number' && !Number.isNaN(num)){
                return new Buffer.from([num]);
            }
            else return false;
        },
        NumtoBuf : function(num,length){
            if(typeof num === 'number' && !Number.isNaN(num) && Number.isInteger(num)){
                if(length == 4){
                    return(this.NumtoBuf(num));
                }
                else if(length == 1){
                    if(num <= 0xFF){
                        return new Buffer.from([num]);
                    }
                    else return false;
                }
                else if(length == 2){
                    if(num <= 0xFF){
                        return new Buffer.from([0x00,num]);
                    }
                    else if(num <= 0xFFFF){
                        return new Buffer.from([Math.floor(num/0xFF),num - Math.floor(num/0xFF)]);
                    }
                    else return false;
                }
                else return false;
            }else return false;
        },
        StrtoBuf : function(str){
            if(typeof str == "string"){
                return (new TextEncoder).encode(str);
            } 
            else{
                return (new TextEncoder).encode(String(str));
            }
        }
    }
})();