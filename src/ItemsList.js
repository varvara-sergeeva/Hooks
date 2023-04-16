import React, {useState, useEffect} from 'react'

//* при изменении нашего параметра getItems массив будет заполняться элементами

export default function ItemListFunc({ getItems }) {
	const [items, setItems] = useState([])

	useEffect(() => {
		const newItems = getItems(6)
		setItems(newItems)
	}, [getItems])


	return (
		<ul>
			{items.map(i => <li key={i}>{i}</li>)}
		</ul>
	)

}