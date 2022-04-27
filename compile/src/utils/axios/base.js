// base.ts
export class Base {
}
/* 公共模块 */
Object.defineProperty(Base, "env", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: process.env.NODE_ENV === "development"
        ? "http://localhost:5382"
        : "http://localhost:5382"
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy91dGlscy9heGlvcy9iYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFVBQVU7QUFDVixNQUFNLE9BQU8sSUFBSTs7QUFDYixVQUFVO0FBQ0g7Ozs7V0FBTSxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxhQUFhO1FBQy9DLENBQUMsQ0FBQyx1QkFBdUI7UUFDekIsQ0FBQyxDQUFDLHVCQUF1QjtHQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLy8gYmFzZS50c1xyXG5leHBvcnQgY2xhc3MgQmFzZSB7XHJcbiAgICAvKiDlhazlhbHmqKHlnZcgKi9cclxuICAgIHN0YXRpYyBlbnYgPSBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gXCJkZXZlbG9wbWVudFwiXHJcbiAgICAgICAgPyBcImh0dHA6Ly9sb2NhbGhvc3Q6NTM4MlwiXHJcbiAgICAgICAgOiBcImh0dHA6Ly9sb2NhbGhvc3Q6NTM4MlwiXHJcbn1cclxuIl19