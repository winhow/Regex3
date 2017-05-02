var syntax = {

  // Java code with syntax higher light,
  // and add line number.
  replace : function(name) {
    var v = document.getElementsByName(name);
    var comment = this.comment();
    var string = this.string();
    var keywords = this.keywords();
    var staticField = this.staticField();
    var staticMethod = this.staticMethod();

    for(var i = 0; i < v.length; i++) {      
      var vi = v[i];
      var s = vi.innerHTML;
      vi.innerHTML = "";
      var total = s.split("\n").length;
      var ss = s.replace(comment, "<span id='comment'>$1</span>")
                .replace(string, "<span id='str'>$1</span>")
                .replace(keywords, "<span id='key'>$1</span>")
                .replace(staticField, "$1<span id='staticField'>$2</span>")
                .replace(staticMethod, "$1<span id='staticField'>$2</span>");
      s = this.init(ss);
      var line = document.createElement("div");
      line.innerHTML = this.toLine(total);
      line.id = "lineNumber";
      vi.appendChild(line);
      var code = document.createElement("div");
      code.innerHTML = s;
      code.id = "java";
      vi.appendChild(code);
      vi.id = "";
    }
  },

  // Java keywords list
  keyList : "abstract assert boolean break byte case catch char " +
      "class const continue default do double else enum extends " +
      "false final finally float for if goto implements import " +
      "instanceof int interface long native new null package " +
      "private protected public return short static strictfp " +
      "super switch synchronized this throw throws transient " +
      "true try void volatile while",

  // Converting non-HTML character to standard
  init : function(str) {
    return str.replace(/[ ]{2}/g, "&nbsp;&nbsp;")
              .replace(/^[ ]/gm, "&nbsp;")
              .replace(/\n/g, "&nbsp;<br/>")
              .replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;");
  },

  // Pattern of keyword
  keywords : function() {
    return new RegExp(this.getKeywords(this.keyList), 'mg');
  },

  // Pattern of string constant
  string : function() {
    return /("[^"\\\r\n]*(?:\\.[^"\\\r\n]*)*")/g;
  },
  
  // Pattern of comment include sigleline and multiline
  comment : function() {
    return /(\/\/[^"\r\n]*$|(?:[^"]+)\/\*[\s\S]*?\*\/)/mg;
  },

  // Converting keywords list to regex
  getKeywords : function(keywords) {
    return "\\b(" + keywords.replace(/ /g, "|") + ")\\b";
  },

  // Pattern of static method
  staticMethod : function() {
    return /([A-Z]\w+\.)(\w+\b)/g;
  },

  // Pattern of constant field
  staticField : function() {
    return /(^(?:[^"\\\r\n])*?|(?:"(?:[^"\\\r\n])+?"[^"\\\r\n]*?)*?)\b([A-Z_]+)\b(?![^"]*?\\")/mg;
  },

  // Count number of lines
  toLine : function(num) {
    var s = "";
    for(var i = 1; i <= num; i++) {
    if(i > 1) {
      s += "<br/>";
    }
    s +=  this.format(i);
    }
    return s;
  },

  // Formatting line number
  format : function(num) {
    if(num < 10) {
      return "00" + num;
    }else if(num < 100){
      return "0" + num;
    }else{
      return num;
    }
  }
}
