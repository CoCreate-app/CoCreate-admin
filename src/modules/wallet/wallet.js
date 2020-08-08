var social = social || {};

social.feed = function($) {

  'use strict';

  var vm = new Vue({
    el: '#socialVue',
    data: {
      posts: [],
      selectedPost: null
    },
    mounted: function() {
      this.fetchData();

    },
    methods: {
      fetchData: function() {

        // Posts
        $.getJSON( 'https://www.juicer.io/api/feeds/cardinalfinancial', {
          format: "json"
        })
          .done(function( data ) {
          vm.posts = data.posts.items;
        });
      },
      setSelectedPost: function(post) {
        this.selectedPost = post;
        console.log(this.selectedPost);
      }
    },
    filters: {
      formatDate: function (value) {
        if (value) {
          return moment(value, "YYYYMMDD").fromNow();
        }
      }
    }
  })



  return {
    vm: vm
  };

}(jQuery);


