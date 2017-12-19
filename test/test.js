var assert = require("assert"),
    should = require('should'),
    should_http = require('should-http');


describe("Compass Digital IDs", function()
{
    var compassdigitalid = null,
        id = null;

    it("should instantiate the library", function(done)
    {
        compassdigitalid = require("../index.js");
        should.exist(compassdigitalid);

        done();
    });

    it("should encode an id", function(done)
    {
        id = compassdigitalid({
            service: "menu",
            provider: "bamco",
            type: "item",
            id: 12345
        });

        should.exist(id);

        done();

    });

    it("should decode an id", function(done)
    {
        compassdigitalid(id).should.eql({
            service: "menu",
            provider: "bamco",
            type: "item",
            id: "12345"
        });

        done();
	});
	
	it("should not re-encode an encoded id with the same config", function(done)
	{
		var new_id = compassdigitalid({
            service: "menu",
            provider: "bamco",
            type: "item",
            id: id
		});
		
		should.exist(new_id);
		new_id.should.eql(id);

		var new_id = compassdigitalid({
            service: "menu",
            provider: "foo",
            type: "item",
            id: id
		});
		
		should.exist(new_id);
		new_id.should.eql(id);

		var new_id = compassdigitalid({
            service: "menu",
            provider: "bamco",
            type: "option",
            id: id
		});
		
		should.exist(new_id);
		new_id.should.not.eql(id);

		done();
	});

    it("should decode a version 1 id", function(done)
    {
        var old_id = "9PD8DyAg2RFZJ3yoDLYJiapBl0yr71hDZN";
        old_id.should.not.eql(id);

        compassdigitalid(id).should.eql({
            service: "menu",
            provider: "bamco",
            type: "item",
            id: "12345"
        });

        done();
    });

    it("should make sure that service, provider and type are made lowercased, but not the id", function(done)
    {
        var id = compassdigitalid({
            service: "MENU",
            provider: "BAMCO",
            type: "ITEM",
            id: "12345UPPERlower"
        });
        should.exist(id);
        compassdigitalid(id).should.eql({
            service: "menu",
            provider: "bamco",
            type: "item",
            id: "12345UPPERlower"
        });

        done();

    });

    it("should make sure the same id is generated if values are passed uppercase or lowercase", function(done)
    {
        var id = compassdigitalid({
            service: "MENU",
            provider: "BAMCO",
            type: "ITEM",
            id: "12345"
        });
        should.exist(id);
        compassdigitalid({
            service: "menu",
            provider: "bamco",
            type: "item",
            id: "12345"
        }).should.eql(id);

        done();

    });

    it("should generate an id even if id is null", function(done)
    {
        var id = compassdigitalid({
            service: "MENU",
            provider: "BAMCO",
            type: "ITEM"
        });
        should.exist(id);
        compassdigitalid(id).should.eql({
            service: "menu",
            provider: "bamco",
            type: "item",
            id: undefined
        });

        done();

    });

    it("should generate an id even if id is null, using convenience format", function(done)
    {
        var null_id = compassdigitalid("menu", "bamco", "item");
        should.exist(null_id);
        compassdigitalid(null_id).should.eql({
            service: "menu",
            provider: "bamco",
            type: "item",
            id: undefined
        });

        done();

    });

    it("should encode an id using params for convenience", function(done)
    {
        var new_id = compassdigitalid("menu", "bamco","item", 12345);

        should.exist(new_id);
        new_id.should.eql(id);

        done();

    });

    it("should properly encode/decode locations", function(done)
    {
        var data = {
            service: "location",
            provider: "dh",
            type: "brand",
            id: "1056"
        };

        var new_id = compassdigitalid(data);

        compassdigitalid(new_id).should.eql(data);

        new_id = compassdigitalid("location", "dh", "brand", "1056");

        compassdigitalid(new_id).should.eql(data);

        done();
    })

    it("should not create an id if invalid params are passed", function(done)
    {
        should.not.exist(compassdigitalid({
            service: "menu",
            id: 12345
        }));

        should.not.exist(compassdigitalid("menu", null,"item"));

        done();
    });

    it("should not return a decoded id if the id is malformed", function(done)
    {
        should.not.exist((compassdigitalid("dsfdfsfdf")));
        done();
    });

    it("should not return a decoded id if the id is not valid hex", function(done)
    {
        should.not.exist((compassdigitalid("6351810")));
        done();
    });
    
    it("should return nothing if a weird type is passed", function(done)
    {
        should.not.exist(compassdigitalid(new Date()));
        done();
    });

});