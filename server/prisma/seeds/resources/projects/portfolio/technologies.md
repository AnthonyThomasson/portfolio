[HOME](/)

# Technologies

#### React

I have spent a number of years working with Vue now, but had not had much experience with React. I thought this would be a good opportunity to learn a new framework.

#### Typescript

From my experience working with Golang I really have began to appreciate the benefits of using a typed language. Coming from development mostly in PHP, I have really begun to enjoy the benefits of having a type system. Choosing Typescript for this project was an obvious choice, especially because of how prevalent JavaScript is across the web.

I absolutely love the code completion that comes with properly defined types and interfaces, however I did find myself occasionally forgetting to type a return value or variable and losing out on the benefits of the type system. I miss the strictness found in Golang where an untyped variable will not compile, and all return values need to be explicitly stated. I was able to simulate this a little bit by using eslint to enforce the use of types.

#### Yarn

I have been using NPM for a long time, but I have been hearing a lot of good things about Yarn. I wanted to give it a try and see if it was worth switching over.

I was especially interested in Yarn Berry, which is a new version of Yarn that works quite differently than the previous versions. I wanted to see if it was worth switching over to this new version. I found that it was not quite ready for production use, but I am excited to see where it goes in the future. I am hoping that it will eventually be able to replace NPM completely. I especially like the idea of removing the node_modules folder from the project, and creating offline caches of the dependencies.

#### Vite

I have experimented a little bit with Vite in the past while working with vue, but I have never used it with React. I wanted to see how well it works, and if it would be a good replacement for Webpack.

I struggled a little bit to set up a development workflow that I was happy with. I first just set up a watcher that would recompile my client every time I made a change, and then move the compiled dist to my server so that it could be served. This worked, but it was a little bit slow. It also kind of defeated the purpose of using Vite, which is to have a fast development server that does not need to recompile the entire project every time you make a change.

My solution was to develop locally using the vite dev server, and use a proxy to forward requests to my running server. This works alright, but I am unable to test my severs ability to deliver static files. I am hoping that I can find a better solution in the future. I did include a deployment that would build everything together incase I wanted to test this logic before deploying.
