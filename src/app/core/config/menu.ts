import {Menu} from "../models/menu.models";

export const MENU: { menu: Menu[] }[] = [
  {
    menu: [
      {
        name: 'Main',
        icon: 'home',
        path: 'main',
      },
      {
        name: 'Favourite',
        icon: 'star',
        path: 'favourite',
      },
      {
        name: 'Statistics',
        icon: 'insert_chart',
        path: 'statistics',
      }
    ]
  }]
