
var sync = require('synchronize');
var request = require('request');
var _ = require('underscore');


// The API that returns the in-email representation.
module.exports = function(req, res) {
  var url = req.query.url.trim();

  // stackoverflow questions are in the format:
  // http://stackoverflow.com/questions/<numberic id>
  var matches = url.match(/[0-9]+/);

  if (!matches) {
    res.status(400).send('Invalid URL format');
    return;
  }

  var id = matches[0];
  //console.log(matches[0])
  var response;
  try {
    response = sync.await(request({
      url: 'https://api.stackexchange.com/2.2/questions/' + encodeURIComponent(id),
      qs: {
        site: 'stackoverflow',
        filter: 'withbody'
      },
      gzip: true,
      json: true,
      timeout: 15 * 1000
    }, sync.defer()));
  } catch (e) {
    res.status(500).send('Error');
    return;
  }


  var reply = response.body.items[0];

  var quesTitle = reply.title;
  if(quesTitle.length > 65){
    quesTitle = quesTitle.substring(0,65);
    quesTitle = quesTitle + "...";
  }

  var quesBody = reply.body;
  if(quesBody.length > 175){
    quesBody = quesBody.substring(0,175);
    quesBody = quesBody + "...";
  }

  var questionTitle = '<h4><b><a href="'+ url +'">' + quesTitle + '</a></b><img src="http://i.stack.imgur.com/URSOY.png" alt="img" align="left"/></h4></b>';
  var questionBody = '<p><style> p {line-height: 1; }</style>' + quesBody + '</p><small><i>stackoverflow.com</i></small>';

  var html = questionTitle + questionBody;
  res.json({
    body: html
    // Add raw:true if you're returning content that you want the user to be able to edit
  });
};
