if (location.pathname.match(/^\/companies\/bizcast\/projects?$/)) {
  if ($(".project-support-link").length) {
    var next_url = "https://www.wantedly.com/companies/buysell-technologies/projects"
    AllGoForIt(next_url);
  }
} else if (location.pathname.match(/^\/companies\/buysell-technologies\/projects?$/)) {
  if ($(".project-support-link").length != 0) {
    $.ajax({
      url: 'https://raw.githubusercontent.com/sqrtxx/benritools/master/ouen.txt',
      type: 'GET',
      success: function(data){
        var text = data.replace(/\n/g, ',').replace(/[^0-9,]/g, '').toString();
        var project_ids = text.substr( 0, text.length-1 ).split(',');
        var first_project_id = project_ids[0];
        var next_url = "https://www.wantedly.com/projects/" + first_project_id;
        AllGoForIt(next_url);
      }
    })
  }
} else {
  $.ajax({
    url: 'https://raw.githubusercontent.com/sqrtxx/benritools/master/ouen.txt',
    type: 'GET',
    success: function(data){
      var urls     = data.replace(/\n/g, ',').trim(',').split(',');
      
      var url_idx = urls.indexOf(location.href);
      
      if (url_idx != -1 && $(".project-support-link").length) {
        if (urls.length - 1 != url_idx) {
          var next_url = urls[url_idx + 1]
          GoForIt(next_url);
        } else {
          alert('応援完了です！\n本日もご協力ありがとうございました！')
        }
      }
    }
  })
}

function GoForIt(target_url) {

var arr = []

$('.wt-button.blue.noborder.project-support-link.ng-isolate-scope').each(function(){
  arr.push($(this).data('project-id'))
});

ouen(arr,target_url);
            
};

function AllGoForIt(target_url) {
var arr = []

$('.projects-index-single').each(function(){
  arr.push($(this).data('project-id'))
});

ouen(arr, target_url);

}


function ouen(arr, target_url) {
    if(arr.length==0) return;
    // 配列の先頭を使う
    param = arr[0];
     
    //TODO: 何かの処理
    console.log('ouen: ' + param);
    
    var project_id = param
    var json = {"project_support":{"message":"","project_id": project_id,"post_to_fb_wall":false,"post_to_twitter":false,"post_to_linkedin":false}};
    $.ajax({
      type:"post",
      url:"/projects/" + project_id + "/supports",
      data:JSON.stringify(json),
      contentType: 'application/json',
      dataType: "json"
    })
 
    // 処理済みのパラメータ削除
    arr.shift();
    // 次の回の実行予約
    setTimeout(function(){
        ouen(arr);
        if ($(".project-support-link").length == 0) {
          window.location = target_url
        }
    },  Math.random() * 1000 + 1000 );
  
  
  
}
