LSCP.Collection.ConfigCollection = Backbone.Collection.extend({

    model: LSCP.Model.Config,

    initialize : function() {
        this.loadLocalFiles();
    },

    setDefault: function() {

//        log('lscp.idevxxi.current_config in localStorage', ('lscp.idevxxi.current_config' in localStorage), localStorage['lscp.idevxxi.current_config']);
        if (!('lscp.idevxxi.current_config' in localStorage)) {
            localStorage['lscp.idevxxi.current_config'] = this.first();
        }
    },

    getCurrent: function() {
        return localStorage['lscp.idevxxi.current_config'];
    },

    loadLocalFiles: function() {

        $.getJSON('data/config_files_list.json', _.bind(function(data){

            var local_files = [];
            _.each(data.files, _.bind(function(file){
                local_files.push(new LSCP.Model.Config({path: 'data/' + file}));
            }, this));
            this.add(local_files);

        }, this));

    },

    loadCurrentConfig: function(callback) {

        if (!('lscp.idevxxi.current_config' in localStorage)) {
            localStorage['lscp.idevxxi.current_config'] = 'data/config/default.json';
        }

        $.getJSON(this.getCurrent(), callback);

    }


});