import { rest } from 'msw';
import { endpoints } from 'consts';

const handlers = [
  rest.get(
    `${process.env.REACT_APP_API_URL}${endpoints.employers}`,
    (req, res, ctx) =>
      res(
        ctx.json([
          {
            _id: '631abacbf1dea1f194b3d208',
            name: 'Coherent Solutions',
            code: 'LT',
            street: 'Konstitucijos ave 29',
            city: 'Vilnius',
            state: 'Lithuania',
            zipCode: '11111',
            phone: '8-688-00-000',
            id: '68af1773-9dae-4618-9078-dab5605cdea7',
            __v: 0,
          },
          {
            _id: '631abba3f1dea1f194b3d20a',
            name: 'ISSoft',
            code: 'UA',
            street: 'Кулькпарківська, 226 А',
            city: 'Lviv',
            state: 'Ukraine',
            zipCode: '00000',
            phone: '+380 68 289 81 38',
            id: '1472af9d-a491-43f7-9de5-2eaf95fb408a',
            __v: 0,
          },
          {
            _id: '632d2966bb8867926cc92e1e',
            name: 'Coherent Solutions',
            code: 'USA',
            street: '1600 Utica Ave S, Suite 120',
            city: 'Minneapolis',
            state: 'MN',
            zipCode: '55416',
            phone: '1.612.279.6262',
            id: '17647fe6-0e4f-4e03-a8d3-932c3c72c50d',
            __v: 0,
          },
        ])
      )
  ),
];

export default handlers;
