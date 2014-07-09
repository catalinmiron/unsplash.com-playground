$(document).ready(function(){
  var API_KEY = "0vnPZgYAxI84PbLXDhSsQX3snzk5OSfJdyttEA28en26KvwWQ3&",
      link = "http://api.tumblr.com/v2/blog/unsplash.tumblr.com/posts/photo/?api_key=" + API_KEY + "&offset=",
      offset = 0,
      $mainContainer = $('.unsplash-photos');
  function fetchData(offset){
        $.ajax({
          url: link + offset,
          dataType: 'jsonp',
          success: function(results){
            var posts = results.response.posts,
                length= posts.length;
            for(var i=0; i<length; i++){
              var currentPost = results.response.posts[i],
                  img_url = currentPost.photos[0].original_size.url,
                  blogInfo = results.response.blog;

              // todo: cleanup the code below
              $mainContainer.append(
                  "<div class='image-container' style='background-image:url("+ img_url +");'>"+
                    "<!-- Small screens fallback -->" +
                    "<img src='"+img_url+"'/>" +
                      "<div class='image-caption'>" +
                        "<h2>" +
                          currentPost.caption +
                          "<span> Powered by" +
                            "<a href="+ blogInfo.url+" target='_blank'>" +
                              blogInfo.title +
                            "</a>" +
                          "</span>" +
                        "</h2>" +
                      "</div>"+
                    "</div>");
            }
          }
          // todo: oncomplete hide loading container
        });
  }

  // Call fetchData without offset to get the first 20 images
  fetchData();

  // Use throttle to call just once fetchData without worry to much about
  // re-fatching data with other offset
  // http://underscorejs.org/#throttle
  var checkForFetching = _.throttle(check, 1200);

  function check(){
    var window_height = $mainContainer.height(),
        document_height = $(window).height(),
        scroll_position = $(window).scrollTop();
    if (window_height - (document_height + scroll_position) < 5000) {
      // increase offset with 20 and re-call fetchData with the new offset
      // todo: add loading container
      offset+= 20;
      fetchData(offset);
    }
  }

  $(window).scroll(checkForFetching);

});

