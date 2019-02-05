import React, { PureComponent } from 'react';
import moment from 'moment';
import 'moment/locale/fr';
import 'moment/locale/ru';
import 'moment/locale/es';
import MomentUtils from '@date-io/moment';
import CalendarIcon from '@material-ui/icons/CalendarToday';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import { DateTimePicker, MuiPickersUtilsProvider } from 'material-ui-pickers';

;



const localeMap = {
    en: 'en',
    fr: 'fr',
    ru: 'ru',
};

export default class MomentLocalizationExample extends PureComponent {
    state = {
        selectedDate: moment().format("YYYY/MM/DD HH:mm:ss"),
        anchorEl: null,
        currentLocale: 'es',
    };


    labelFunc=(date,invalidLabel)=>{

        return moment(date).format("YYYY/MM/DD HH:mm:ss");

}
    handleDateChange = date => {
        this.setState({ selectedDate: moment(date).format("YYYY/MM/DD HH:mm:ss") });
    };


    render() {
        const { selectedDate } = this.state;
        const locale = localeMap[this.state.currentLocale];

        return (
            <MuiPickersUtilsProvider utils={MomentUtils} locale={locale} moment={moment}>
                <div className="picker">
                    <DateTimePicker
                        ampm={false}
                        value={selectedDate}

                        allowKeyboardControl={false}
                        autoOk
                        onChange={this.handleDateChange}
                        labelFunc={this.labelFunc}
                        onError={console.log}
                        InputProps={{
                            endAdornment: (
                                <IconButton>
                                    <CalendarIcon />
                                </IconButton>
                            ),
                        }}

                    />
                </div>


            </MuiPickersUtilsProvider>
        );
    }
}
