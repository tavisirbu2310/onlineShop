Project built with React and designed using CSS modules for avoiding class names conflict as it would happen in regular CSS. I worked with an API that I designed on firebase. I chose to use an API designed by me rather than a public API with hundreds of products because the functionality would have been similar for more products anyways and it gave me the opportunity to design my own API and experience a little bit with firebase too.

The user can add any of the products to the cart(on bigger screens the user has to hover over the product to flip the product card to the other side and add the product to the cart). If the user presses the add button more than one time, the amount of that product will also update on the server and show in the cart. 
Once in the Cart page, the user can change the amount of a certain product using an input, which will also update that amount on the server so when the page is refreshed, the cart stays intact. If a negative number/0 is submitted in the amount input, the product will automatically delete from the server. There is also a button to directly delete the product from the server.Both methods automatically re-render the Cart page too so the changes can be seen in real time by the user.

Both the design and the functionality are 100% my work.

To run it:

1.Clone

2.Run npm install

3.Run npm start
