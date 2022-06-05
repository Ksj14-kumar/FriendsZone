import React from 'react'

function GeeyMenuButton() {
    return (
        <>
            <div class="container-fluid">
                <div class="row">
                    <div class="col-xs-12">
                        <div class="ms-nav-container">
                            <ul class="ms-nav">
                                <input type="checkbox" id="ms-menu" class="ms-menu-toggle" name="ms-menu-toggle" />
                                <div class="bg-change"></div>
                                <li class="ms-li ms-li3 ms-li-last">
                                    hekllo
                                    <a href="javascript:void(0)">
                                        <span class="fa fa-search"></span>
                                    </a>
                                </li>
                                <li class="ms-li ms-li2">
                                    <a href="javascript:void(0)">
                                        <span class="fa fa-flask"></span>
                                    </a>
                                </li>
                                <li class="ms-li ms-li1 ms-li-first">
                                    <a href="javascript:void(0)">
                                        <span class="fa fa-fort-awesome"></span>
                                    </a>
                                </li>
                                <li class="ms-main">
                                    <a href="javascript:void(0)">
                                        <label class="ms-menu-toggle-lbl" for="ms-menu">
                                            <span class="fa fa-plus"></span>
                                        </label>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default GeeyMenuButton