import G6 from "@antv/g6";

G6.registerNode(
    'tree-node',
    {
      drawShape: function drawShape(cfg:any, group:any) {
        const rect = group.addShape('rect', {
          attrs: {
            fill: '#91d5ff',
            stroke: '#40a9ff',
            x: 0,
            y: 0,
            width:1,
            height: 1
          },
          name: 'rect-shape',
        });
        const content = cfg.id.toString().replace(/(.{19})/g, '$1\n');
        const text = group.addShape('text', {
          attrs: {
            text: content,
            x: 0,
            y: 0,
            textAlign: 'left',
            textBaseline: 'middle',
            fill: '#000',
          },
          name: 'text-shape',
        });
        const bbox = text.getBBox();
        const hasChildren = cfg.children && Array(cfg.children).length > 0;
        rect.attr({
          x: -bbox.width / 2 - 4,
          y: -bbox.height / 2 - 6,
          width: bbox.width + (hasChildren ? 26 : 12),
          height: bbox.height + 12,
        });
        text.attr({
          x: -bbox.width / 2,
          y: 0
        })
        if (hasChildren) {
          group.addShape('marker', {
            attrs: {
              x: bbox.width / 2 + 12,
              y: 0,
              r: 6,
              symbol: cfg.collapsed ? G6.Marker.expand : G6.Marker.collapse,
              stroke: '#666',
              lineWidth: 2,
            },
            name: 'collapse-icon',
          });
        }
        return rect;
      },
      update: (cfg, item) => {
        const group = item.getContainer();
        const icon = group.find((e) => e.get('name') === 'collapse-icon');
        icon.attr('symbol', cfg.collapsed ? G6.Marker.expand : G6.Marker.collapse);
      },
    },
    'single-node',
  );

  G6.registerNode(
    'tree-node',
    {
      drawShape: function drawShape(cfg:any, group:any) {
        const rect = group.addShape('rect', {
          attrs: {
            fill: '#91d5ff',
            stroke: '#40a9ff',
            x: 0,
            y: 0,
            width:1,
            height: 1
          },
          name: 'rect-shape',
        });
        const content = cfg.id.toString().replace(/(.{19})/g, '$1\n');
        const text = group.addShape('text', {
          attrs: {
            text: content,
            x: 0,
            y: 0,
            textAlign: 'left',
            textBaseline: 'middle',
            fill: '#000',
          },
          name: 'text-shape',
        });
        const bbox = text.getBBox();
        const hasChildren = cfg.children && Array(cfg.children).length > 0;
        rect.attr({
          x: -bbox.width / 2 - 4,
          y: -bbox.height / 2 - 6,
          width: bbox.width + (hasChildren ? 26 : 12),
          height: bbox.height + 12,
        });
        text.attr({
          x: -bbox.width / 2,
          y: 0
        })
        if (hasChildren) {
          group.addShape('marker', {
            attrs: {
              x: bbox.width / 2 + 12,
              y: 0,
              r: 6,
              symbol: cfg.collapsed ? G6.Marker.expand : G6.Marker.collapse,
              stroke: '#666',
              lineWidth: 2,
            },
            name: 'collapse-icon',
          });
        }
        return rect;
      },
      update: (cfg, item) => {
        const group = item.getContainer();
        const icon = group.find((e) => e.get('name') === 'collapse-icon');
        icon.attr('symbol', cfg.collapsed ? G6.Marker.expand : G6.Marker.collapse);
      },
    },
    'single-node',
  );