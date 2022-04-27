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
}`


const defaultFunctionString=
`const graph=new G6.TreeGraph({
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
`

export const treeGraph={
  DataString:defaultDataString,
  FunctionString:defaultFunctionString
};