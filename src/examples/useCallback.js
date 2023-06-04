import './App.css';
// вынимаем отдельно хуки с пом ES6 и используем его как функцию
import React, {useState, useEffect, useRef, useCallback} from 'react'

//! импортируем компонент из другого файла
import ItemsList from './ItemsList'


function App() {
	//! разные свойства и динамика которая будет изменять компонет

	const [colored, setColored] = useState(false)
	const [count, setCount] = useState(1)

	const styles = {
		color: colored ? '#C70039' : '#17120c'
	}

	//* допустим хотим генерировать элементы в зависимости от счетчика (добавление товара в корзине)
	// создаем новый массив с длинной коунтера, с пом филл заполняем чем-то, с пом мэпа трансформируем новй массив помещаем элемент и выводим его индекс , так как в мэпе индекс идет вторым параметром, первый от элемента оставляем прочерком
	// эта функция работает в зависимости от каунтера
	//! нажимаем на кнопку увеличивается счетчик, счетчик вызыват generateItemsFromAPI, она затрагивает getItems и в итоге появляется новый элемент
	//const generateItemsFromAPI = useCallback(() => {
	//	return new Array(count).fill('').map((_, i) => `элемент ${i + 1}`)
	//}, [count])

	//! можем использовать Параметры!!
	// indexNum - определяем в ItemList
	const generateItemsFromAPI = useCallback((indexNum) => {
		return new Array(count).fill('').map((_, i) => `элемент ${i + indexNum}`)
	}, [count])

	//! тело самого компонента
	return ( 
		<div className='wrap'>
			<div className='top'>
				<h2 className='title'>useCallback</h2>
				<ul>
					<li><p className='description'><b>useCallback</b> - ограничивает количество вызовов функции, те она работает только при изменении указаных зависимостей</p></li>
					<li><p className='description'>useCallback в отличие от useEffect не вызывается при рендере<b></b></p></li>
					<li><p className='description'>например, хотим генерировать эл-т в зависимости от счетчика: <br/><b>{`useCallback(() => {генерируем эл-т}, [счетчик])`}</b></p></li>
					<li><p className='description'> отличие мемо от коллбэка, мемо кэширует и возвращает итоговое значенние функции и не может принимать параметры для функции, а useCallback может <b></b></p></li>
					<li><p className='description'>useCallback состоит из двух параметров: первый это сама функция, второй это параметры которые определяют ее вызов<b></b></p></li>
				</ul>
			</div>
			<div className='content'>
				<h3 className='sourse' style={styles}>Количество элементов: {count}</h3>
				<button className='plus' onClick={() => setCount(prev => prev + 1)}>plus</button>
				<button className='push' onClick={() => setColored(prev => !prev)}>color</button>
					{/* обращаемся к иному копмоненту*/}
				<ItemsList getItems={generateItemsFromAPI}/>
			</div>
		</div>
	)
}

export default App;