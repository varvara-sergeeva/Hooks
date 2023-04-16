import './App.css';
// вынимаем отдельно хуки с пом ES6 и используем его как функцию
import React, {useState, useEffect, useRef} from 'react'

function App() {
	//! разные свойства и динамика которая будет изменять компонет

	//* считаем сколько рендеров в зависимости от изменения в инпуте
	const [value, setValue] = useState('')
	const renderCounter = useRef(0)

	//* get the DOM element
	const inputRef = useRef(null)

	useEffect(() => {
		renderCounter.current++
		console.log(inputRef.current.value)
	})

	//* push focus on the element
	const focus = () => inputRef.current.focus()


	//* нужно получить значение предыдущего рендера - в зависимости от изменения useState выводится предыдущее состояние инпута
	const prevValue = useRef('')
	useEffect(() => {
		prevValue.current = value
	}, [value])

	


	//! тело самого компонента
	return ( 
		<div className='wrap'>
			<div className='top'>
				<h2 className='title'>useRef</h2>
				<ul>
					<li><p className='description'>любые переменные <span className='red'>вне</span> компонента <b>неправильно</b> задействовать в коде</p></li>
					<li><p className='description'><b>useRef</b> это <b>объект</b>, и чтобы получить что-то от него надо обращаться к его свойству <b>current</b></p></li>
					<li><p className='description'>если мы хотим сохранить что-то между рендерами, то используем <b>useRef</b>, если что-то перерисовать то - <b>useState</b></p></li>
					<li><p className='description'>useRef позволяет получать ссылки на <span className='red'>DOM элементы</span></p></li>
					<li><p className='description'>можем получить <span className='red'>input.value</span></p></li>
					<li><p className='description'>можем задать фокус на <span className='red'>input</span></p></li>
					<li><p className='description'>можем наблюдать  <span className='red'>предыдущее состояние</span></p></li>
				</ul>
			</div>
			<div className='content'>
				<h3 className='sourse'>Page's render: {renderCounter.current}</h3>
				<h3 className='sourse'>Prev value: {prevValue.current}</h3>
				<div className='box box-col'>
					<input ref={inputRef} type="text" onChange={e => setValue(e.target.value)} value={value} />
					<button className='push' onClick={focus}>focus</button>
				</div>

			</div>
		</div>
	)
}

export default App;