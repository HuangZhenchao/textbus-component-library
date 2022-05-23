export function getComponentsByName(startComponent, name) {
    const components = [];
    function fn(component, result) {
        //console.log(component);
        //console.log(component.tagName);
        //if (/h[1-6]/.test(component.tagName)) {
        if (component.name == name) {
            result.push(component);
        }
        component.slots.toArray().forEach(slot => {
            slot.content.data.forEach(childComponent => {
                if (typeof childComponent === 'string') {
                    return;
                }
                fn(childComponent, result);
            });
            /*
            if (typeof i === 'string') {
                return;
            }
            fn(i, result);*/
        });
    }
    fn(startComponent, components);
    //console.log(components);
    return components;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0Q29tcG9uZW50cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3RleHRidXMvdXRpbHMvY29tcG9uZW50L2dldENvbXBvbmVudHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsTUFBTSxVQUFVLG1CQUFtQixDQUFDLGNBQWMsRUFBQyxJQUFJO0lBQ25ELE1BQU0sVUFBVSxHQUFHLEVBQUUsQ0FBQztJQUN0QixTQUFTLEVBQUUsQ0FBQyxTQUFTLEVBQUUsTUFBTTtRQUN6Qix5QkFBeUI7UUFDekIsaUNBQWlDO1FBQ2pDLHlDQUF5QztRQUN6QyxJQUFJLFNBQVMsQ0FBQyxJQUFJLElBQUUsSUFBSSxFQUFFO1lBQ3RCLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDMUI7UUFDRCxTQUFTLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNyQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFBLEVBQUU7Z0JBQ3RDLElBQUksT0FBTyxjQUFjLEtBQUssUUFBUSxFQUFFO29CQUNwQyxPQUFPO2lCQUNWO2dCQUNELEVBQUUsQ0FBQyxjQUFjLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDL0IsQ0FBQyxDQUFDLENBQUM7WUFDSDs7Ozs0QkFJZ0I7UUFDcEIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0QsRUFBRSxDQUFDLGNBQWMsRUFBRSxVQUFVLENBQUMsQ0FBQztJQUMvQiwwQkFBMEI7SUFDMUIsT0FBTyxVQUFVLENBQUM7QUFDdEIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudEluc3RhbmNlIH0gZnJvbSBcIkB0ZXh0YnVzL2NvcmVcIjtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRDb21wb25lbnRzQnlOYW1lKHN0YXJ0Q29tcG9uZW50LG5hbWUpOkNvbXBvbmVudEluc3RhbmNlW10ge1xyXG4gICAgY29uc3QgY29tcG9uZW50cyA9IFtdO1xyXG4gICAgZnVuY3Rpb24gZm4oY29tcG9uZW50LCByZXN1bHQpIHtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKGNvbXBvbmVudCk7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhjb21wb25lbnQudGFnTmFtZSk7XHJcbiAgICAgICAgLy9pZiAoL2hbMS02XS8udGVzdChjb21wb25lbnQudGFnTmFtZSkpIHtcclxuICAgICAgICBpZiAoY29tcG9uZW50Lm5hbWU9PW5hbWUpIHtcclxuICAgICAgICAgICAgcmVzdWx0LnB1c2goY29tcG9uZW50KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29tcG9uZW50LnNsb3RzLnRvQXJyYXkoKS5mb3JFYWNoKHNsb3QgPT4ge1xyXG4gICAgICAgICAgICBzbG90LmNvbnRlbnQuZGF0YS5mb3JFYWNoKGNoaWxkQ29tcG9uZW50PT57XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGNoaWxkQ29tcG9uZW50ID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGZuKGNoaWxkQ29tcG9uZW50LCByZXN1bHQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLypcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBpID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZuKGksIHJlc3VsdCk7Ki9cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGZuKHN0YXJ0Q29tcG9uZW50LCBjb21wb25lbnRzKTtcclxuICAgIC8vY29uc29sZS5sb2coY29tcG9uZW50cyk7XHJcbiAgICByZXR1cm4gY29tcG9uZW50cztcclxufSJdfQ==