import { createElement, createTextNode } from "@textbus/browser";
export class SizeSetter {
    constructor(name, i18n) {
        Object.defineProperty(this, "elementRef", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "inputs", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: name
        });
        Object.defineProperty(this, "i18n", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: i18n
        });
        Object.defineProperty(this, "elementRef", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "inputs", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        this.elementRef = createElement('div', {
            classes: ['textbus-form-group'],
            children: [
                createElement('label', {
                    classes: ['textbus-control-label'],
                    children: [
                        createTextNode(i18n.get('label'))
                    ]
                }),
                createElement('div', {
                    classes: ['textbus-control-value'],
                    children: [
                        createElement('div', {
                            classes: ['textbus-toolbar-image-size-setter'],
                            children: [
                                createElement('input', {
                                    attrs: { type: 'text', placeholder: i18n.get('widthPlaceholder') },
                                    classes: ['textbus-form-control']
                                }),
                                createTextNode(' * '),
                                createElement('input', {
                                    attrs: { type: 'text', placeholder: i18n.get('heightPlaceholder') },
                                    classes: ['textbus-form-control']
                                })
                            ]
                        })
                    ]
                })
            ]
        });
        this.inputs = Array.from(this.elementRef.querySelectorAll('input'));
    }
    reset() {
        this.inputs.forEach(input => input.value = '');
    }
    update(value) {
        this.inputs[0].value = (value === null || value === void 0 ? void 0 : value.width) || '';
        this.inputs[1].value = (value === null || value === void 0 ? void 0 : value.height) || '';
    }
    getAttr() {
        return {
            name: this.name,
            value: {
                width: this.inputs[0].value,
                height: this.inputs[1].value
            }
        };
    }
    validate() {
        return true;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2l6ZVNldHRlci5Gb3JtSXRlbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3RleHRidXMvdXRpbHMvZm9ybS9TaXplU2V0dGVyLkZvcm1JdGVtLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsYUFBYSxFQUFFLGNBQWMsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBRWpFLE1BQU0sT0FBTyxVQUFVO0lBSW5CLFlBQVksSUFBSSxFQUFFLElBQUk7UUFIdEI7Ozs7O1dBQXdCO1FBQ3hCOzs7OztXQUEyQjtRQUMzQjs7Ozs7V0FBVTtRQUVSLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRTtZQUNsQyxVQUFVLEVBQUUsSUFBSTtZQUNoQixZQUFZLEVBQUUsSUFBSTtZQUNsQixRQUFRLEVBQUUsSUFBSTtZQUNkLEtBQUssRUFBRSxJQUFJO1NBQ1osQ0FBQyxDQUFDO1FBQ0gsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFO1lBQ2xDLFVBQVUsRUFBRSxJQUFJO1lBQ2hCLFlBQVksRUFBRSxJQUFJO1lBQ2xCLFFBQVEsRUFBRSxJQUFJO1lBQ2QsS0FBSyxFQUFFLElBQUk7U0FDWixDQUFDLENBQUM7UUFDSCxNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxZQUFZLEVBQUU7WUFDeEMsVUFBVSxFQUFFLElBQUk7WUFDaEIsWUFBWSxFQUFFLElBQUk7WUFDbEIsUUFBUSxFQUFFLElBQUk7WUFDZCxLQUFLLEVBQUUsS0FBSyxDQUFDO1NBQ2QsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFO1lBQ3BDLFVBQVUsRUFBRSxJQUFJO1lBQ2hCLFlBQVksRUFBRSxJQUFJO1lBQ2xCLFFBQVEsRUFBRSxJQUFJO1lBQ2QsS0FBSyxFQUFFLEVBQUU7U0FDVixDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsVUFBVSxHQUFHLGFBQWEsQ0FBQyxLQUFLLEVBQUU7WUFDckMsT0FBTyxFQUFFLENBQUMsb0JBQW9CLENBQUM7WUFDL0IsUUFBUSxFQUFFO2dCQUNSLGFBQWEsQ0FBQyxPQUFPLEVBQUU7b0JBQ3JCLE9BQU8sRUFBRSxDQUFDLHVCQUF1QixDQUFDO29CQUNsQyxRQUFRLEVBQUU7d0JBQ1IsY0FBYyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7cUJBQ2xDO2lCQUNGLENBQUM7Z0JBQ0YsYUFBYSxDQUFDLEtBQUssRUFBRTtvQkFDbkIsT0FBTyxFQUFFLENBQUMsdUJBQXVCLENBQUM7b0JBQ2xDLFFBQVEsRUFBRTt3QkFDUixhQUFhLENBQUMsS0FBSyxFQUFFOzRCQUNuQixPQUFPLEVBQUUsQ0FBQyxtQ0FBbUMsQ0FBQzs0QkFDOUMsUUFBUSxFQUFFO2dDQUNSLGFBQWEsQ0FBQyxPQUFPLEVBQUU7b0NBQ3JCLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsRUFBRTtvQ0FDbEUsT0FBTyxFQUFFLENBQUMsc0JBQXNCLENBQUM7aUNBQ2xDLENBQUM7Z0NBQ0YsY0FBYyxDQUFDLEtBQUssQ0FBQztnQ0FDckIsYUFBYSxDQUFDLE9BQU8sRUFBRTtvQ0FDckIsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFO29DQUNuRSxPQUFPLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQztpQ0FDbEMsQ0FBQzs2QkFDSDt5QkFDRixDQUFDO3FCQUNIO2lCQUNGLENBQUM7YUFDSDtTQUNGLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDdEUsQ0FBQztJQUNELEtBQUs7UUFDSCxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUNELE1BQU0sQ0FBQyxLQUFLO1FBQ1YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxLQUFLLEtBQUssSUFBSSxJQUFJLEtBQUssS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDekYsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxLQUFLLEtBQUssSUFBSSxJQUFJLEtBQUssS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDNUYsQ0FBQztJQUNELE9BQU87UUFDTCxPQUFPO1lBQ0wsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO1lBQ2YsS0FBSyxFQUFFO2dCQUNMLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUs7Z0JBQzNCLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUs7YUFDN0I7U0FDRixDQUFDO0lBQ0osQ0FBQztJQUNELFFBQVE7UUFDTixPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNyZWF0ZUVsZW1lbnQsIGNyZWF0ZVRleHROb2RlIH0gZnJvbSBcIkB0ZXh0YnVzL2Jyb3dzZXJcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBTaXplU2V0dGVyIHtcclxuICAgIGVsZW1lbnRSZWY6IEhUTUxFbGVtZW50O1xyXG4gICAgaW5wdXRzOiBIVE1MSW5wdXRFbGVtZW50W107XHJcbiAgICBuYW1lOiBhbnk7XHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBpMThuKSB7XHJcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBcIm5hbWVcIiwge1xyXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxyXG4gICAgICAgIHdyaXRhYmxlOiB0cnVlLFxyXG4gICAgICAgIHZhbHVlOiBuYW1lXHJcbiAgICAgIH0pO1xyXG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgXCJpMThuXCIsIHtcclxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcclxuICAgICAgICB3cml0YWJsZTogdHJ1ZSxcclxuICAgICAgICB2YWx1ZTogaTE4blxyXG4gICAgICB9KTtcclxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIFwiZWxlbWVudFJlZlwiLCB7XHJcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXHJcbiAgICAgICAgd3JpdGFibGU6IHRydWUsXHJcbiAgICAgICAgdmFsdWU6IHZvaWQgMFxyXG4gICAgICB9KTtcclxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIFwiaW5wdXRzXCIsIHtcclxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcclxuICAgICAgICB3cml0YWJsZTogdHJ1ZSxcclxuICAgICAgICB2YWx1ZTogW11cclxuICAgICAgfSk7XHJcbiAgICAgIHRoaXMuZWxlbWVudFJlZiA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcclxuICAgICAgICBjbGFzc2VzOiBbJ3RleHRidXMtZm9ybS1ncm91cCddLFxyXG4gICAgICAgIGNoaWxkcmVuOiBbXHJcbiAgICAgICAgICBjcmVhdGVFbGVtZW50KCdsYWJlbCcsIHtcclxuICAgICAgICAgICAgY2xhc3NlczogWyd0ZXh0YnVzLWNvbnRyb2wtbGFiZWwnXSxcclxuICAgICAgICAgICAgY2hpbGRyZW46IFtcclxuICAgICAgICAgICAgICBjcmVhdGVUZXh0Tm9kZShpMThuLmdldCgnbGFiZWwnKSlcclxuICAgICAgICAgICAgXVxyXG4gICAgICAgICAgfSksXHJcbiAgICAgICAgICBjcmVhdGVFbGVtZW50KCdkaXYnLCB7XHJcbiAgICAgICAgICAgIGNsYXNzZXM6IFsndGV4dGJ1cy1jb250cm9sLXZhbHVlJ10sXHJcbiAgICAgICAgICAgIGNoaWxkcmVuOiBbXHJcbiAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnZGl2Jywge1xyXG4gICAgICAgICAgICAgICAgY2xhc3NlczogWyd0ZXh0YnVzLXRvb2xiYXItaW1hZ2Utc2l6ZS1zZXR0ZXInXSxcclxuICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbXHJcbiAgICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoJ2lucHV0Jywge1xyXG4gICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IHR5cGU6ICd0ZXh0JywgcGxhY2Vob2xkZXI6IGkxOG4uZ2V0KCd3aWR0aFBsYWNlaG9sZGVyJykgfSxcclxuICAgICAgICAgICAgICAgICAgICBjbGFzc2VzOiBbJ3RleHRidXMtZm9ybS1jb250cm9sJ11cclxuICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICAgIGNyZWF0ZVRleHROb2RlKCcgKiAnKSxcclxuICAgICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudCgnaW5wdXQnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgdHlwZTogJ3RleHQnLCBwbGFjZWhvbGRlcjogaTE4bi5nZXQoJ2hlaWdodFBsYWNlaG9sZGVyJykgfSxcclxuICAgICAgICAgICAgICAgICAgICBjbGFzc2VzOiBbJ3RleHRidXMtZm9ybS1jb250cm9sJ11cclxuICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIF1cclxuICAgICAgfSk7XHJcbiAgICAgIHRoaXMuaW5wdXRzID0gQXJyYXkuZnJvbSh0aGlzLmVsZW1lbnRSZWYucXVlcnlTZWxlY3RvckFsbCgnaW5wdXQnKSk7XHJcbiAgICB9XHJcbiAgICByZXNldCgpIHtcclxuICAgICAgdGhpcy5pbnB1dHMuZm9yRWFjaChpbnB1dCA9PiBpbnB1dC52YWx1ZSA9ICcnKTtcclxuICAgIH1cclxuICAgIHVwZGF0ZSh2YWx1ZSkge1xyXG4gICAgICB0aGlzLmlucHV0c1swXS52YWx1ZSA9ICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogdmFsdWUud2lkdGgpIHx8ICcnO1xyXG4gICAgICB0aGlzLmlucHV0c1sxXS52YWx1ZSA9ICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogdmFsdWUuaGVpZ2h0KSB8fCAnJztcclxuICAgIH1cclxuICAgIGdldEF0dHIoKSB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgbmFtZTogdGhpcy5uYW1lLFxyXG4gICAgICAgIHZhbHVlOiB7XHJcbiAgICAgICAgICB3aWR0aDogdGhpcy5pbnB1dHNbMF0udmFsdWUsXHJcbiAgICAgICAgICBoZWlnaHQ6IHRoaXMuaW5wdXRzWzFdLnZhbHVlXHJcbiAgICAgICAgfVxyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gICAgdmFsaWRhdGUoKSB7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gIH0iXX0=