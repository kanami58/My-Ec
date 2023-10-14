export type Item = {
	id: number;
	name: string;
	price: number;
	imageUrl: string; 
}

export type CartItem = {
	count: number;
	cartId: number;
	itemId: number;
	name: string;
	price: number;
	imageUrl: string; 
}