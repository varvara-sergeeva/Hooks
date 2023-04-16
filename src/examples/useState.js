import './App.css';
// вынимаем отдельно хуки с пом ES6 и используем его как функцию
import React, {useState} from 'react'

function App() {
	//! разные свойства и динамика которая будет изменять компонет

	// React.useState() - без вынимания через ES6
	
	//* самый элементарный пример счетчика
	//const [counter, setCounter] = useState(0)
	//function increment() {
	//	setCounter(counter + 1)
	//}
	//function decrement() {
	//	setCounter(counter - 1)
	//}

	//* если хотим некое повторяющееся действие основанное на предыдущем состоянии:
	//function increment() {
	//	setCounter((prevCounter) => {
	//		return prevCounter + 1
	//	})
	//	setCounter(prev => prev + 1)
	//}

	//* один раз вычисляет изначальное значение
	function initCalculate() {
		return Math.trunc(Math.random()* 20)
	}
	const [counter, setCounter] = useState(() => {
		return initCalculate()
	})
	function increment() {
		setCounter(counter + 1)
	}
	function decrement() {
		setCounter(counter - 1)
	}

	//* когда у нас хук используется в качество объекта, и мы хотим одно из значений изменить, то мы создаем функцию которая передает новый массив включающий в себя все что находится в изначальном и после этого вводим изменения

	const [state, setState] = useState({
		title: 'Init title',
		date: Date.now()
	})
	function updateTitle() {
		setState(prev => {
			return {
				...prev,
				title: 'New title'
			}
		})
	}

	//! тело самого компонента
	return ( 
		<div className='wrap'>
			<div className='top'>
				<h2 className='title'>useState</h2>
				<ul>
					<li><p className='description'><b>useState</b> - возвращает массив с заранее определенными элементами, первый элемент это изначальное состояние шаблона, второй - это функция, которая меняет что нужно, а реакт перерисовывает</p></li>
					<li><p className='description'>инициализируя хук мы определяем сразу массив, в котором первый параметр это шаблон, а второй параметр функция которая будет его менять - <b>const [шаблоные значения, функция] = useState(0)</b></p></li>
					<li><p className='description'>мы не можем вставлять <b>useState</b> в какие-либо условия <b>if</b></p></li>
					<li><p className='description'>чтобы избежать багов, при более сложных задачах лучшие практики это основываться на <b>callback</b> функциях, основываясь на предыдущем состоянии элемента</p></li>
					<li><p className='description'>если <b>изначальное</b> значение должно как-то вычисляться один лишь раз, то в <b> хук useState</b> можно передать функцию, чтобы при каждом рендеренге эта изначальные вычисление каждый раз не вызывались - что сильно оптимизирует работу кода</p></li>
					<li><p className='description'>когда мы используем useState в виде <b>объекта</b> в <span className='red'>функциональных</span> компонентах, то что мы передаем полностью заменяет что было, в этом отличие от <span className='red'>классовых</span> компонентов</p></li>
					<li><p className='description'><b></b></p></li>
				</ul>
			</div>
			<div className='content'>
				<h3 className='state--counter'>Counter: {counter}</h3>
				<button onClick={increment} className='plus'>Plus</button>
				<button onClick={decrement} className='minus'>Minus</button>
				<div className='box'>
					<div className='object'>{JSON.stringify(state, null, 2)}</div>
					<button onClick={updateTitle} className='plus'>update</button>
				</div>
			</div>
		</div>
	)
}

export default App;