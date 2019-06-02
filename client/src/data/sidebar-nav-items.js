export default function () {
  return [
    {
      title: 'Главная',
      to: '/dashboard',
      htmlBefore: '<i class="material-icons">dashboard</i>',
      htmlAfter: ''
    },
    {
      title: 'Пользователи',
      to: '/users',
      htmlBefore: '<i class="material-icons">person</i>',
      htmlAfter: ''
    },
    {
      title: 'События',
      to: '/events',
      htmlBefore: '<i class="material-icons">vertical_split</i>',
      htmlAfter: ''
    },
    {
      title: 'Пропуски',
      to: '/keys',
      htmlBefore: '<i class="material-icons">credit_card</i>',
      htmlAfter: ''
    },
    {
      title: 'Системные события',
      to: '/system_events',
      htmlBefore: '<i class="material-icons">info</i>',
      htmlAfter: '',
      admin: true
    },
    {
      title: 'Системные пользователя',
      to: '/system_users',
      htmlBefore: '<i class="material-icons">person_outline</i>',
      htmlAfter: '',
      admin: true
    }
    /*
    {
      title: 'Blog Dashboard',
      to: '/blog-overview',
      htmlBefore: '<i class="material-icons">edit</i>',
      htmlAfter: ''
    },
    {
      title: 'Blog Posts',
      htmlBefore: '<i class="material-icons">vertical_split</i>',
      to: '/blog-posts'
    },
    {
      title: 'Add New Post',
      htmlBefore: '<i class="material-icons">note_add</i>',
      to: '/add-new-post'
    },
    {
      title: 'Forms & Components',
      htmlBefore: '<i class="material-icons">view_module</i>',
      to: '/components-overview'
    },
    {
      title: 'Tables',
      htmlBefore: '<i class="material-icons">table_chart</i>',
      to: '/tables'
    },
    {
      title: 'User Profile',
      htmlBefore: '<i class="material-icons">person</i>',
      to: '/user-profile-lite'
    },
    {
      title: 'Errors',
      htmlBefore: '<i class="material-icons">error</i>',
      to: '/errors'
    }
    */
  ];
}
