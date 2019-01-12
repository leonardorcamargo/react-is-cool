import React from 'react';
import Clock from '../Clock'

class App extends React.Component {
    render() {
        return (
            <div>
                <Clock 
                    name="Leonardo"
                    phrase="LIER!"
                />
            </div>
        )
    }
}

export default App;