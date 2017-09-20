var Hashids = require('hashids');
var hashids = new Hashids("Compass Digital");

class CompassDigitalId
{

    static encode(config)
    {
        if(!config || !(config.service && config.provider && config.type && config.id))
        {
            return;
        }

        var joined = [config.service, config.provider, config.type, config.id.toString()].join(".");
        var hex_joined = Buffer(joined).toString("hex");
        var hashid = hashids.encodeHex(hex_joined);

        return hashid;
    }

    static decode(id)
    {
        var hex = hashids.decodeHex(id);
        var joined = Buffer(hex, "hex").toString();
        var parsed = joined.split(".");
        
        if(parsed.length == 4)
        {
            return {
                service: parsed[0],
                provider: parsed[1],
                type: parsed[2],
                id: parsed[3]
            };
        }
        else
        {
            return;
        }
    }

}

module.exports = (data, provider, type, id) => {

    if(data && provider && type && id)
    {
        return CompassDigitalId.encode({
            service: data,
            provider: provider,
            type: type,
            id: id
        });
    }
    else if(typeof data == "string")
    {
        return CompassDigitalId.decode(data);
    }
    else
    {
        return CompassDigitalId.encode(data);
    }
}