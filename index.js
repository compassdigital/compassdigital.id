const Hashids = require('hashids').default;
const hashids = new Hashids("Compass Digital");

const dictionary = {
    "l": "location",
    "m": "menu",
    "i": "item",
	"c": "shoppingcart",
	"o": "order"
}

var dictionary_flip = {};
Object.keys(dictionary).forEach(function(short)
{
	dictionary_flip[dictionary[short]] = short;
});

class CompassDigitalId
{
    static word_shortform(longform)
    {
		if(!longform || typeof longform != "string") return;
		
		return dictionary_flip[longform];
    }

    static word_longform(shortform)
    {
        if(!shortform || typeof shortform != "string") return;

        return dictionary[shortform.toLowerCase()];
    }

    static encode(config)
    {
        if(!config || !(config.service && config.provider && config.type))
        {
            return;
		}
		
		if(config.id)
		{
			var parsed = CompassDigitalId.decode(config.id);

			// ID is already a CDL ID with the same config
			if(parsed && parsed.service == config.service && parsed.type == config.type)
			{
				return config.id;
			}
		}

        var parts = [];
        ["service", "provider", "type"].forEach(function(key)
        {
			var val = config[key].toString().toLowerCase();

			if(val.indexOf(".") >= 0)
			{
				throw new Error(`${key} cannot contain a period`);
			}

            var short_form = CompassDigitalId.word_shortform(val);

            parts.push(short_form ? short_form.toUpperCase() : val);
        });
		if(config.id) parts.push(config.id.toString());

        var joined = parts.join(".");

		var hex_joined = Buffer(joined).toString("hex");
        var hashid = hashids.encodeHex(hex_joined);

        return hashid;
	}
	
	static valid(id)
	{
		try
        {
			if(!id) return false;
			if(!id.length || id.length < 13) return false; // IDs never are smaller than 13 chars.

			var hex = hashids.decodeHex(id);
			if(Array.isArray(hex)) return false;
			return true;
		}
		catch(err)
		{
			return false;
		}
	}

    static decode(id)
    {
        try
        {
			var hex = hashids.decodeHex(id);
			if(Array.isArray(hex)) return;
			var joined = Buffer(hex, "hex").toString();
            
            var parsed = joined.split(".");

            if(parsed.length >= 3)
            {
				var id = parsed[3] ? joined.substring(parsed[0].length + parsed[1].length + parsed[2].length + 3) : parsed[3];

                var json = {
                    service: parsed[0],
                    provider: parsed[1],
                    type: parsed[2],
                    id: id
                };

                ["service", "provider", "type"].forEach(function(key)
                {
					var val = json[key];
					if(val.length === 1 && val.toString().toUpperCase() == val)
                    {
                        val = CompassDigitalId.word_longform(val);
                        if(val) json[key] = val;
                    }
                });

                return json;
            }
            else
            {
                return;
            }
        }
        catch(err)
        {
            return;
        }
    }

}

module.exports = (data, provider, type, id) => {

    if(data && provider && type)
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
    else if(data !== undefined)
    {
        return CompassDigitalId.encode(data);
	}
	else
	{
		return CompassDigitalId;
	}
}