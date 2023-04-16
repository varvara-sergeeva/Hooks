import './App.css';
// вынимаем отдельно хуки с пом ES6 и используем его как функцию
import React, {useState, useEffect, useRef, useMemo} from 'react'

// функция для торможения производительности для примера оптимизации с помощью useMemo
function complexCompute(num) {
	let i = 0
	while (i < 100000000) i++
	return num * 2
}

function App() {
	//! разные свойства и динамика которая будет изменять компонет
	//* big complex compute
	const [number, setNumber] = useState(42)
	const [colored, setColored] = useState(false)
	//* передаем цвет через переменную прямо в разметке
	//const styles = {
	//	color: colored ? '#C70039' : '#17120c'
	//}

	//* без использования кэширования 
	// const result = complexCompute(number)

	//* кэшируем и ставим условие на изменение числа
	const result = useMemo(() => {
		return complexCompute(number)
	}, [number])

	//* если мы вызовим эффект и хотим следить за стилем который меняем через объект, то видим что весь объект полностью перерендеривается когда происходит вычисление, но при этом стили не меняются. однако следим мы за всем объектом и если он новый, то считается что изменился
	//* оптимизируем эту байду

	const styles = useMemo(() => {
		return {
			color: colored ? '#C70039' : '#17120c'
		}
	}, [colored])

	useEffect(() => {
		console.log('styles change')
	}, [styles])

	//! тело самого компонента
	return ( 
		<div className='wrap'>
			<div className='top'>
				<h2 className='title'>useMemo</h2>
				<ul>
				<li><p className='description'><b>useMemo</b> позволяяет <b>закэшировать</b> некое значение, т.е задаем зависимость и только если она выполняется, тогда запускаем рендер, если нет - то рендера нет</p></li>
				<li><p className='description'><b>Например: </b>когда происходит в компоненте изменение <span className='red'>useState</span> то запускается перерендер, который запускает все <span className='red'>useEffect</span>, но с помощью <span className='red'>useMemo</span> можно закэшировать <span className='red'>useEffect</span> и запустить его действиет только от изменений которые указаны в зависимости</p></li>
				<li><p className='description'>не стоит злоупотреблять <b>useMemo.</b> используй только тогда когда твое приложение <b>заметно</b> тупит и грузитчего </p></li>

				</ul>
			</div>
			<div className='content'>
				<h3 className='sourse' style={styles}>Объемные вычисления: {result}</h3>
				<button className='plus' onClick={() => setNumber(prev => prev + 1)}>plus</button>
				<button className='minus' onClick={() => setNumber(prev => prev - 1)}>minus</button>
				<button className='push' onClick={() => setColored(prev => !prev)}>color</button>
			</div>
		</div>
	)
}

export default App;