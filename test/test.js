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

    it("should encode an id using params for convenience", function(done)
    {
        var new_id = compassdigitalid("menu", "bamco","item", 12345);

        should.exist(new_id);
        new_id.should.eql(id);

        done();

    });

    it("should not create an id if invalid params are passed", function(done)
    {
        should.not.exist(compassdigitalid({
            service: "menu",
            provider: "bamco",
            id: 12345
        }));

        should.not.exist(compassdigitalid("menu", "bamco","item"));

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