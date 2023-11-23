export interface ChartData {
  name: string;
  member: string[];
  child?: boolean;
  children?: ChartData[];
}

export const orgChart: ChartData = {
  name: "Top Level",
  member: ["cha", "me"],
  children: [
    {
      name: "1",
      children: [
        { name: "1.1", member: ["a"] },
        { name: "1.2", member: ["b"] },
        { name: "1.3", member: ["c"] },
        { name: "1.4", member: ["d"] },
      ],
      member: ["d", "e"],
    },
    {
      name: "2",
      member: ["l11co", "12asoi1"],
      child: true,
      children: [
        {
          name: "2.1",
          member: ["h2", "h3"],
          children: [
            {
              name: "2.1.1",
              member: ["lco", "asoi1"],
              children: [
                {
                  name: "2.1.1.1",
                  member: ["d"],
                },
                {
                  name: "2.1.1.2",
                  member: ["g", "h"],
                  children: [{ name: "2.1.1.2.1", member: ["h"] }],
                },
              ],
            },
            {
              name: "2.1.2",
              member: ["lco", "asoi1"],
              child: true,
              children: [
                { name: "2.1.1.1", member: ["abvc"] },
                { name: "2.1.1.2", member: ["as"] },
              ],
            },
          ],
        },
        {
          name: "2.2",
          member: ["g2.2", "i3,2"],
          children: [
            {
              name: "2.2.1",
              member: ["g3.2", "i3,2"],
              child: true,
              children: [
                { name: "2.2.1.1", member: ["g2.2", "asd"] },
                {
                  name: "2.1.1.2.2",
                  member: ["test 1", "test 2"],
                  child: true,
                  children: [
                    {
                      name: "12ed",
                      member: ["test 3", "test4"],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "3",
      member: ["l3", "r3"],
      children: [
        { name: "3.1", member: ["g2.2", "i3,2"], child: true },
        {
          name: "3.2",
          member: ["g2.122", "i3,2a2"],
          children: [
            { name: "3.2.1", member: ["g2.asd", "i31z"] },
            { name: "3.2.2", member: ["g2.2"] },
          ],
        },
      ],
    },
    {
      name: "4",
      member: ["ab21c", "sakii"],
      children: [
        {
          name: "4.1",
          member: ["g12", "i3,asd2"],
          child: true,
          children: [
            {
              name: "4.1.1",
              member: ["oeiw1", "qw1"],
              children: [
                { name: "4.1.1.1", member: ["g2.2"] },
                { name: "4.1.1.2", member: ["42g2.2", "gdi3,2"] },
              ],
            },
            {
              name: "4.1.2",
              member: ["g2.2", "lojw1"],
              children: [
                { name: "4.1.2.1", member: ["abvc"] },
                { name: "4.1.2.1", member: ["ab11vc"] },
              ],
            },
            { name: "4.1.3", member: ["abvc", "azod89so"] },
          ],
        },
        {
          name: "4.2",
          member: ["abvc", "as"],
          children: [
            { name: "3.2.1", member: ["ascc"] },
            { name: "3.2.2", member: ["asas"] },
          ],
        },
      ],
    },
  ],
};

// export const orgChart: ChartData = {
//   name: "Top Level",
//   children: [
//     {
//       name: "1",
//       children: [
//         { name: "1.1" },
//         {
//           name: "1.2",
//           children: [
//             { name: "1.2.1", children: [{ name: "1.2.1.1" }] },
//             { name: "1.2.2" },
//           ],
//         },
//       ],
//     },
//     {
//       name: "2",
//       children: [
//         {
//           name: "2.1",
//           children: [
//             {
//               name: "2.1.1",
//               children: [
//                 {
//                   name: "2.1.1.1",
//                 },
//                 {
//                   name: "2.1.1.2",
//                   children: [{ name: "2.1.1.2.1" }, { name: "2.1.1.2.2" }],
//                 },
//               ],
//             },
//             {
//               name: "2.1.2",
//               children: [{ name: "2.1.1.1" }, { name: "2.1.1.2" }],
//             },
//           ],
//         },
//         {
//           name: "2.2",
//           children: [
//             {
//               name: "2.2.1",
//               children: [{ name: "2.2.1.1" }],
//             },
//           ],
//         },
//       ],
//     },
//   ],
// };
