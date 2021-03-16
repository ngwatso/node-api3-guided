const server {
  _router: {
    stack: [
      {...middleware},
      {...middleware},
      {
        stack: [
          {...middleware},
          {...middleware}
        ]
      }
    ]
  }
}