
# graphql demo

  

## QUERY EXAMPLE

<pre>
{
	{
		products(id:null size:2 page:0){
			id,
			name,
			description,
			price
	}
}
</pre>
  

## MUTATION EXAMPLE
<pre>
mutation {
	addProduct(name:"new thing",description:"lorem",price:45){
		id
	}
}
</pre>