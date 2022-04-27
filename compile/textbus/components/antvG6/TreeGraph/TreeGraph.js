const defaultDataString = `{
    "id": "Modeling Methods",
    "label": "Modeling Methods",
    "children": [
      {
        "id": "Classification",
        "children": [
          {
            "id": "Logistic regression"
          },
          {
            "id": "Linear discriminant analysis"
          },
          {
            "id": "Rules"
          },
          {
            "id": "Decision trees"
          },
          {
            "id": "Naive Bayes"
          },
          {
            "id": "K nearest neighbor"
          },
          {
            "id": "Probabilistic neural network"
          },
          {
            "id": "Support vector machine"
          }
        ]
      },
      {
        "id": "Consensus",
        "children": [
          {
            "id": "Models diversity",
            "children": [
              {
                "id": "Different initializations"
              },
              {
                "id": "Different parameter choices"
              },
              {
                "id": "Different architectures"
              },
              {
                "id": "Different modeling methods"
              },
              {
                "id": "Different training sets"
              },
              {
                "id": "Different feature sets"
              }
            ]
          },
          {
            "id": "Methods",
            "children": [
              {
                "id": "Classifier selection"
              },
              {
                "id": "Classifier fusion"
              }
            ]
          },
          {
            "id": "Common",
            "children": [
              {
                "id": "Bagging"
              },
              {
                "id": "Boosting"
              },
              {
                "id": "AdaBoost"
              }
            ]
          }
        ]
      },
      {
        "id": "Regression",
        "children": [
          {
            "id": "Multiple linear regression"
          },
          {
            "id": "Partial least squares"
          },
          {
            "id": "Multi-layer feedforward neural network"
          },
          {
            "id": "General regression neural network"
          },
          {
            "id": "Support vector regression"
          }
        ]
      }
    ]
}`;
const defaultFunctionString = `const graph=new G6.TreeGraph({
  container:container,
  width:container.clientWidth,
  height:container.clientHeight,
  //fitView:true,
  modes: {
      default: [
        {
          type: 'collapse-expand',
          onChange: function onChange(item, collapsed) {
            const data = item.getModel();
            data.collapsed = collapsed;
            return true;
          },
        },
        'drag-canvas',
        'zoom-canvas',
      ],
  },
  defaultNode: {
      size: [80,25],
      type: 'modelRect',
      style:{
        fill: '#91d5ff',
        stroke: '#40a9ff',
        radius: 5,
      },
      anchorPoints: [
        [0, 0.5],
        [1, 0.5],
      ],
  },
  defaultEdge: {
      type: 'cubic-horizontal',
      style:{
        stroke: '#91d5ff'
      }
  },
  layout: {
      type: 'compactBox',
      direction: 'LR',
      /*
      getId: function getId(d) {
        return d.id;
      },
      getHeight: function getHeight() {
        return 80;
      },
      getWidth: function getWidth() {
        return 20;
      },
      getVGap: function getVGap() {
        return 10;
      },
      getHGap: function getHGap(d) {
        return 220;
      },*/
      getHGap: function getHGap(d) {
        return 100;
      }
  },
});
/*
graph.node(function (node) {
      return {
        label: node.id,
        type: node.type,
        labelCfg: {
          offset: 10,
          position: node.children && node.children.length > 0 ? 'left' : 'right',
        },
      };
});
*/
graph.data(data);
graph.render();
graph.fitView();

if (typeof window !== 'undefined'){
    window.onresize = () => {
        if (!graph || graph.get('destroyed')) return;
        if (!container || !container.scrollWidth || !container.scrollHeight) return;
        graph.changeSize(container.scrollWidth, container.scrollHeight);
    };
}
`;
export const treeGraph = {
    DataString: defaultDataString,
    FunctionString: defaultFunctionString
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHJlZUdyYXBoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vdGV4dGJ1cy9jb21wb25lbnRzL2FudHZHNi9UcmVlR3JhcGgvVHJlZUdyYXBoLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLGlCQUFpQixHQUFHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQTJHeEIsQ0FBQTtBQUdGLE1BQU0scUJBQXFCLEdBQzNCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBcUZDLENBQUE7QUFFRCxNQUFNLENBQUMsTUFBTSxTQUFTLEdBQUM7SUFDckIsVUFBVSxFQUFDLGlCQUFpQjtJQUM1QixjQUFjLEVBQUMscUJBQXFCO0NBQ3JDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBkZWZhdWx0RGF0YVN0cmluZyA9IGB7XHJcbiAgICBcImlkXCI6IFwiTW9kZWxpbmcgTWV0aG9kc1wiLFxyXG4gICAgXCJsYWJlbFwiOiBcIk1vZGVsaW5nIE1ldGhvZHNcIixcclxuICAgIFwiY2hpbGRyZW5cIjogW1xyXG4gICAgICB7XHJcbiAgICAgICAgXCJpZFwiOiBcIkNsYXNzaWZpY2F0aW9uXCIsXHJcbiAgICAgICAgXCJjaGlsZHJlblwiOiBbXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIFwiaWRcIjogXCJMb2dpc3RpYyByZWdyZXNzaW9uXCJcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIFwiaWRcIjogXCJMaW5lYXIgZGlzY3JpbWluYW50IGFuYWx5c2lzXCJcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIFwiaWRcIjogXCJSdWxlc1wiXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBcImlkXCI6IFwiRGVjaXNpb24gdHJlZXNcIlxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgXCJpZFwiOiBcIk5haXZlIEJheWVzXCJcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIFwiaWRcIjogXCJLIG5lYXJlc3QgbmVpZ2hib3JcIlxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgXCJpZFwiOiBcIlByb2JhYmlsaXN0aWMgbmV1cmFsIG5ldHdvcmtcIlxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgXCJpZFwiOiBcIlN1cHBvcnQgdmVjdG9yIG1hY2hpbmVcIlxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIFwiaWRcIjogXCJDb25zZW5zdXNcIixcclxuICAgICAgICBcImNoaWxkcmVuXCI6IFtcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgXCJpZFwiOiBcIk1vZGVscyBkaXZlcnNpdHlcIixcclxuICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXHJcbiAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJpZFwiOiBcIkRpZmZlcmVudCBpbml0aWFsaXphdGlvbnNcIlxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJpZFwiOiBcIkRpZmZlcmVudCBwYXJhbWV0ZXIgY2hvaWNlc1wiXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcImlkXCI6IFwiRGlmZmVyZW50IGFyY2hpdGVjdHVyZXNcIlxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJpZFwiOiBcIkRpZmZlcmVudCBtb2RlbGluZyBtZXRob2RzXCJcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwiaWRcIjogXCJEaWZmZXJlbnQgdHJhaW5pbmcgc2V0c1wiXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcImlkXCI6IFwiRGlmZmVyZW50IGZlYXR1cmUgc2V0c1wiXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBcImlkXCI6IFwiTWV0aG9kc1wiLFxyXG4gICAgICAgICAgICBcImNoaWxkcmVuXCI6IFtcclxuICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcImlkXCI6IFwiQ2xhc3NpZmllciBzZWxlY3Rpb25cIlxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJpZFwiOiBcIkNsYXNzaWZpZXIgZnVzaW9uXCJcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIFwiaWRcIjogXCJDb21tb25cIixcclxuICAgICAgICAgICAgXCJjaGlsZHJlblwiOiBbXHJcbiAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJpZFwiOiBcIkJhZ2dpbmdcIlxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJpZFwiOiBcIkJvb3N0aW5nXCJcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwiaWRcIjogXCJBZGFCb29zdFwiXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgXVxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgXCJpZFwiOiBcIlJlZ3Jlc3Npb25cIixcclxuICAgICAgICBcImNoaWxkcmVuXCI6IFtcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgXCJpZFwiOiBcIk11bHRpcGxlIGxpbmVhciByZWdyZXNzaW9uXCJcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIFwiaWRcIjogXCJQYXJ0aWFsIGxlYXN0IHNxdWFyZXNcIlxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgXCJpZFwiOiBcIk11bHRpLWxheWVyIGZlZWRmb3J3YXJkIG5ldXJhbCBuZXR3b3JrXCJcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIFwiaWRcIjogXCJHZW5lcmFsIHJlZ3Jlc3Npb24gbmV1cmFsIG5ldHdvcmtcIlxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgXCJpZFwiOiBcIlN1cHBvcnQgdmVjdG9yIHJlZ3Jlc3Npb25cIlxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIF1cclxuICAgICAgfVxyXG4gICAgXVxyXG59YFxyXG5cclxuXHJcbmNvbnN0IGRlZmF1bHRGdW5jdGlvblN0cmluZz1cclxuYGNvbnN0IGdyYXBoPW5ldyBHNi5UcmVlR3JhcGgoe1xyXG4gIGNvbnRhaW5lcjpjb250YWluZXIsXHJcbiAgd2lkdGg6Y29udGFpbmVyLmNsaWVudFdpZHRoLFxyXG4gIGhlaWdodDpjb250YWluZXIuY2xpZW50SGVpZ2h0LFxyXG4gIC8vZml0Vmlldzp0cnVlLFxyXG4gIG1vZGVzOiB7XHJcbiAgICAgIGRlZmF1bHQ6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICB0eXBlOiAnY29sbGFwc2UtZXhwYW5kJyxcclxuICAgICAgICAgIG9uQ2hhbmdlOiBmdW5jdGlvbiBvbkNoYW5nZShpdGVtLCBjb2xsYXBzZWQpIHtcclxuICAgICAgICAgICAgY29uc3QgZGF0YSA9IGl0ZW0uZ2V0TW9kZWwoKTtcclxuICAgICAgICAgICAgZGF0YS5jb2xsYXBzZWQgPSBjb2xsYXBzZWQ7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgICdkcmFnLWNhbnZhcycsXHJcbiAgICAgICAgJ3pvb20tY2FudmFzJyxcclxuICAgICAgXSxcclxuICB9LFxyXG4gIGRlZmF1bHROb2RlOiB7XHJcbiAgICAgIHNpemU6IFs4MCwyNV0sXHJcbiAgICAgIHR5cGU6ICdtb2RlbFJlY3QnLFxyXG4gICAgICBzdHlsZTp7XHJcbiAgICAgICAgZmlsbDogJyM5MWQ1ZmYnLFxyXG4gICAgICAgIHN0cm9rZTogJyM0MGE5ZmYnLFxyXG4gICAgICAgIHJhZGl1czogNSxcclxuICAgICAgfSxcclxuICAgICAgYW5jaG9yUG9pbnRzOiBbXHJcbiAgICAgICAgWzAsIDAuNV0sXHJcbiAgICAgICAgWzEsIDAuNV0sXHJcbiAgICAgIF0sXHJcbiAgfSxcclxuICBkZWZhdWx0RWRnZToge1xyXG4gICAgICB0eXBlOiAnY3ViaWMtaG9yaXpvbnRhbCcsXHJcbiAgICAgIHN0eWxlOntcclxuICAgICAgICBzdHJva2U6ICcjOTFkNWZmJ1xyXG4gICAgICB9XHJcbiAgfSxcclxuICBsYXlvdXQ6IHtcclxuICAgICAgdHlwZTogJ2NvbXBhY3RCb3gnLFxyXG4gICAgICBkaXJlY3Rpb246ICdMUicsXHJcbiAgICAgIC8qXHJcbiAgICAgIGdldElkOiBmdW5jdGlvbiBnZXRJZChkKSB7XHJcbiAgICAgICAgcmV0dXJuIGQuaWQ7XHJcbiAgICAgIH0sXHJcbiAgICAgIGdldEhlaWdodDogZnVuY3Rpb24gZ2V0SGVpZ2h0KCkge1xyXG4gICAgICAgIHJldHVybiA4MDtcclxuICAgICAgfSxcclxuICAgICAgZ2V0V2lkdGg6IGZ1bmN0aW9uIGdldFdpZHRoKCkge1xyXG4gICAgICAgIHJldHVybiAyMDtcclxuICAgICAgfSxcclxuICAgICAgZ2V0VkdhcDogZnVuY3Rpb24gZ2V0VkdhcCgpIHtcclxuICAgICAgICByZXR1cm4gMTA7XHJcbiAgICAgIH0sXHJcbiAgICAgIGdldEhHYXA6IGZ1bmN0aW9uIGdldEhHYXAoZCkge1xyXG4gICAgICAgIHJldHVybiAyMjA7XHJcbiAgICAgIH0sKi9cclxuICAgICAgZ2V0SEdhcDogZnVuY3Rpb24gZ2V0SEdhcChkKSB7XHJcbiAgICAgICAgcmV0dXJuIDEwMDtcclxuICAgICAgfVxyXG4gIH0sXHJcbn0pO1xyXG4vKlxyXG5ncmFwaC5ub2RlKGZ1bmN0aW9uIChub2RlKSB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgbGFiZWw6IG5vZGUuaWQsXHJcbiAgICAgICAgdHlwZTogbm9kZS50eXBlLFxyXG4gICAgICAgIGxhYmVsQ2ZnOiB7XHJcbiAgICAgICAgICBvZmZzZXQ6IDEwLFxyXG4gICAgICAgICAgcG9zaXRpb246IG5vZGUuY2hpbGRyZW4gJiYgbm9kZS5jaGlsZHJlbi5sZW5ndGggPiAwID8gJ2xlZnQnIDogJ3JpZ2h0JyxcclxuICAgICAgICB9LFxyXG4gICAgICB9O1xyXG59KTtcclxuKi9cclxuZ3JhcGguZGF0YShkYXRhKTtcclxuZ3JhcGgucmVuZGVyKCk7XHJcbmdyYXBoLmZpdFZpZXcoKTtcclxuXHJcbmlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyl7XHJcbiAgICB3aW5kb3cub25yZXNpemUgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYgKCFncmFwaCB8fCBncmFwaC5nZXQoJ2Rlc3Ryb3llZCcpKSByZXR1cm47XHJcbiAgICAgICAgaWYgKCFjb250YWluZXIgfHwgIWNvbnRhaW5lci5zY3JvbGxXaWR0aCB8fCAhY29udGFpbmVyLnNjcm9sbEhlaWdodCkgcmV0dXJuO1xyXG4gICAgICAgIGdyYXBoLmNoYW5nZVNpemUoY29udGFpbmVyLnNjcm9sbFdpZHRoLCBjb250YWluZXIuc2Nyb2xsSGVpZ2h0KTtcclxuICAgIH07XHJcbn1cclxuYFxyXG5cclxuZXhwb3J0IGNvbnN0IHRyZWVHcmFwaD17XHJcbiAgRGF0YVN0cmluZzpkZWZhdWx0RGF0YVN0cmluZyxcclxuICBGdW5jdGlvblN0cmluZzpkZWZhdWx0RnVuY3Rpb25TdHJpbmdcclxufTsiXX0=