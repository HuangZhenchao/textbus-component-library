export function JsNewGuid() {
    var curguid = "";
    for (var i = 1; i <= 32; i++) {
        var id = Math.floor(Math.random() * 16.0).toString(16);
        curguid += id;
        if ((i == 8) || (i == 12) || (i == 16) || (i == 20))
            curguid += "-";
    }
    return curguid;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vdGV4dGJ1cy91dGlscy9jb21tb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxVQUFVLFNBQVM7SUFDckIsSUFBSSxPQUFPLEdBQUcsRUFBRSxDQUFDO0lBQ2pCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDMUIsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZELE9BQU8sSUFBSSxFQUFFLENBQUM7UUFDZCxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUMvQyxPQUFPLElBQUksR0FBRyxDQUFDO0tBQ3RCO0lBQ0QsT0FBTyxPQUFPLENBQUM7QUFDbkIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiBKc05ld0d1aWQoKSB7XHJcbiAgICB2YXIgY3VyZ3VpZCA9IFwiXCI7XHJcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8PSAzMjsgaSsrKSB7XHJcbiAgICAgICAgdmFyIGlkID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTYuMCkudG9TdHJpbmcoMTYpO1xyXG4gICAgICAgIGN1cmd1aWQgKz0gaWQ7XHJcbiAgICAgICAgaWYgKChpID09IDgpIHx8IChpID09IDEyKSB8fCAoaSA9PSAxNikgfHwgKGkgPT0gMjApKVxyXG4gICAgICAgICAgICBjdXJndWlkICs9IFwiLVwiO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGN1cmd1aWQ7XHJcbn1cclxuIl19