#xml转json

        var xmlLoad = function(str) {
            if(str == null){
                return null
            }
            var doc = str;
            try {
                doc = createXMLDOM();
                doc.async = false;
                doc.loadXML(str);
            }catch(e){
                doc = $.parseXML(str);
            }
            return doc; 
        }
