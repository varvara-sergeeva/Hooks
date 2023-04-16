import './App.css';
// вынимаем отдельно хуки с пом ES6 и используем его как функцию
import React, {useState, useEffect} from 'react'

function App() {
	//! разные свойства и динамика которая будет изменять компонет

	const [type, setType] = useState('users')
	const [data, setData] = useState([])
	const [pos, setPos] = useState({
		x: 0, 
		y: 0
	})

	//* может ни от чего не зависить и просто выполняться каждый раз при рендере - так легко отслеживать рендер страницы
	//useEffect( () => {
	//	console.log('page render')
	//})

	//* может иметь условие, которое мы сами определяем
	//useEffect( () => {
	//	console.log('changetype')
	//}, [type])

	//* воспользуемся API - jsonplaceholder
	//useEffect( () => {
	//	fetch(`https://jsonplaceholder.typicode.com/${type}`)
  //    .then(response => response.json())
  //    .then(json => setData(json))
	//}, [type])

	//* отображение координат курсора, запуск только один раз
	//useEffect( () => {
	//	window.addEventListener('mousemove', event => {
	//		setPos({
	//			x: event.clientX,
	//			y: event.clientY
	//		})
	//	})
	//}, [])

	//* координаты курсора, но с последующим удалением слушателя (создаем отдельно функцию, и отменяем листенер при возвращении)

	const mouseMoveHandler = event => {
		setPos({
			x: event.clientX,
			y: event.clientY
		})
	}

	useEffect(() => {
		window.addEventListener('mousemove', mouseMoveHandler)
		return() => {
			window.removeEventListener('mousemove', mouseMoveHandler)
		}
	}, [])


	//! тело самого компонента
	return ( 
		<div className='wrap'>
			<div className='top'>
				<h2 className='title'>useEffect</h2>
				<ul>
					<li><p className='description'><b>useEffect</b> - <span className='red'>callback</span> функция которая вызыватся когда мы определим, либо по дефолту при каждом рендере</p></li>
					<li><p className='description'>мы можем задать зависимость при которой будет срабатывать хук, например эффект будет сработывать только после изменения <b>useState - type</b></p></li>
					<li><p className='description'>если хотим, чтобы useEffect вызвался один раз, то надо в условие поставить пустой массив</p></li>
					<li><p className='description'>любые слушатели которые мы добавляем нужно <b>удалять,</b> они влияют на производительность. Удаляем через <b>return</b> с функцией</p></li>
					<li><p className='description'>useEffect <span className='red'>нельзя</span> использовать с useState так как это вызывает бесконечный цикл<b></b></p></li>
				</ul>
			</div>
			<div className='content'>
				<h3 className='sourse'>Sourse: {type}</h3>
				<button onClick={() => setType('users')} className='plus'>users</button>
				<button onClick={() => setType('todos')} className='minus'>to do</button>
				<button onClick={() => setType('posts')} className='push'>post</button>
				<div className='box'>
					{/*<pre className='object'>{JSON.stringify(data, null, 2)}</pre>*/}
					{/*для отображения координат*/}
					<pre className='object'>{JSON.stringify(pos, null, 2)}</pre>
				</div>
			</div>
		</div>
	)
}

export default App;